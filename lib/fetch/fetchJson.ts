import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

type FetchResponse = {
  data?: unknown;
  error?: unknown;
};

const fetchJson = async (url: string, config: RequestInit = { method: "GET" }, verbose = true): Promise<FetchResponse> => {
  if (verbose) console.info(`FETCH JSON ${url}`);
  // console.log(config);

  let json: FetchResponse;
  try {
    const res = await fetch(url, config);

    json = (await res.json()) as FetchResponse;
  } catch (e) {
    json = { error: e };
    console.error("FETCH JSON ERROR", e, url, config);
  }

  // console.log(`FETCH JSON ${url}`, JSON.stringify(json, null, 2));
  return json;
};

export { fetchJson };
