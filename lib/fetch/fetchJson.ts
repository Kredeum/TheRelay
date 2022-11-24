import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

type FetchResponse = {
  data?: unknown;
  error?: unknown;
};

const fetchJson = async (url: string, config: RequestInit = { method: "GET" }): Promise<FetchResponse> => {
  // console.log(`fetchJson ${url}`);
  // console.log(config);

  let json: FetchResponse;
  try {
    const res = await fetch(url, config);

    json = (await res.json()) as FetchResponse;
  } catch (e) {
    json = { error: e };
    console.error("fetchJson ERROR", e, url, config);
  }

  // console.log(`fetchJson ${url}`, JSON.stringify(json, null, 2));
  return json;
};

export { fetchJson };
