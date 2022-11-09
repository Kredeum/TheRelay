import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

const fetchJson = async (url: string, config: RequestInit = { method: "GET" }): Promise<string> => {
  // console.log(`fetchJson\n${url}`);
  // console.log(config);
  // console.log(config.body);

  let json = "{}";

  try {
    const res = await fetch(url, config);

    json = (await res.json()) as string;
  } catch (e) {
    console.error("fetchJson ERROR", e);
  }

  // console.log("fetchJson", json);
  return json;
};

export { fetchJson };
