/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

const fetchText = async (url: string, config: RequestInit = { method: "GET" }, verbose = true, error = "KO"): Promise<string> => {
  if (verbose) console.info(`FETCH TEXT ${url}`);
  // console.log(config);
  // console.log(config.body);

  let text = error;
  try {
    const res = await fetch(url, config);

    text = await res.text();
  } catch (err) {
    console.error("FETCH TEXT ERROR", (err as { message: string; }).message);
  }

  // console.log("FETCH TEXT", Text);
  return text;
};

export { fetchText };
