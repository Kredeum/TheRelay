import type { RequestInit } from "node-fetch";
import { OptionsType, THERELAY_STARTING } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";
import { theRelay } from "@lib/theRelay";

const queryTheRelay = async (theRelayUrl: string, endpoint: string, query: string, options?: OptionsType): Promise<unknown> => {
  if (options?.logs) console.info(`${endpoint}\n${query}`);

  const config: RequestInit = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  // console.log("queryTheRelay", config);

  const url = `${theRelayUrl}/${endpoint.replace("https://", "")}`;
  // console.log("queryTheRelay", url);

  let status = "";
  if (options?.therelay) status = await theRelay("start");

  const json = await fetchJson(url, config);

  if (status == THERELAY_STARTING) await theRelay("stop");

  // console.log("queryTheRelay", json);
  return json;
};

export { queryTheRelay };