import { Readable } from "stream";

let serverPromise;

async function getServer() {
  if (!serverPromise) {
    serverPromise = import(new URL("../dist/server/server.js", import.meta.url));
  }
  const mod = await serverPromise;
  return mod.default ?? mod;
}

function getRequestUrl(req) {
  const host = Array.isArray(req.headers.host) ? req.headers.host[0] : req.headers.host || "localhost";
  return new URL(req.url ?? "/", `https://${host}`);
}

function nodeRequestToWeb(req) {
  const url = getRequestUrl(req);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers || {})) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      headers.set(key, value.join(","));
    } else {
      headers.set(key, String(value));
    }
  }

  const init = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
  }

  return new Request(url.toString(), init);
}

async function sendWebResponse(res, response) {
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}

export default async function handler(req, res) {
  try {
    const server = await getServer();
    const request = nodeRequestToWeb(req);
    const response = await server.fetch(request, {}, {});
    await sendWebResponse(res, response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
