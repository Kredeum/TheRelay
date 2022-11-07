import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

const fetchJson = async (url: string, config: RequestInit = { method: "GET" }): Promise<string> => {
  // console.log(`fetchJson ${url} ${JSON.stringify(config)}`);

  let json = "{}";

  try {
    const res = await fetch(url, config);

    json = (await res.json()) as string;
  } catch (e) {
    console.error("fetchJson fetch ERROR", e);
  }

  // console.log("fetchJson", json);
  return json;
};

export { fetchJson };
