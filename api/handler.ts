import { Readable } from "stream";
import server from "../src/server";

function getRequestUrl(req: { url?: string; headers: Record<string, string | string[] | undefined> }) {
  const host = (req.headers.host as string) || "localhost";
  return new URL(req.url ?? "/", `https://${host}`);
}

function nodeRequestToWeb(req: any): Request {
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

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
  }

  return new Request(url.toString(), init);
}

function sendWebResponse(res: any, response: Response) {
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  return response.arrayBuffer().then((buffer) => {
    res.end(Buffer.from(buffer));
  });
}

export default async function handler(req: any, res: any) {
  try {
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
