import type { RequestInit } from "node-fetch";
import { QueryOptionsType, THERELAY_STARTING } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";
import { theRelay } from "@lib/theRelay";

const queryTheRelay = async (relayUrl: string, endpoint: string, query: string, options?: QueryOptionsType): Promise<unknown> => {
  if (options?.logs) console.info(`${relayUrl} => ${endpoint}\n${query}`);

  const config: RequestInit = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log("queryTheRelay", config);

  const url = `${relayUrl}/${endpoint}`;
  // console.log("queryTheRelay", url);

  const status = await theRelay("start");
  // console.log("queryTheRelay", status);

  const json = await fetchJson(url, config);
  if (status == THERELAY_STARTING) await theRelay("stop");

  // console.log("queryTheRelay", json);
  return json;
};

export { queryTheRelay };