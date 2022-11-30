/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

const fetchText = async (url: string, config: RequestInit = { method: "GET" }): Promise<string> => {
  console.info(`FETCH TEXT ${url}`);
  // console.log(config);
  // console.log(config.body);

  let text = "KO";

  try {
    const res = await fetch(url, config);

    text = await res.text();
  } catch (e) {
    console.error("fetchText ERROR", e);
  }

  // console.log("fetchText", Text);
  return text;
};

export { fetchText };
