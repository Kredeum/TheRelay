import type { RequestInit } from "node-fetch";

import { RELAY_URL, QueryType } from "@lib/common";
import { fetchJson } from "@lib/fetchJson";
import { getEndpointTheGraph } from "@lib/getEndpoint";
import { QueryOptionsType } from "./common";

const queryTheRelay = async (graphName: string, query: string, options?: QueryOptionsType): Promise<unknown> => {
  const endpointUrl = getEndpointTheGraph(graphName);
  if (options?.logs) console.info(`${RELAY_URL} => ${endpointUrl}\n${query}`);

  const relay: QueryType = { endpointUrl, query };
  // console.log("relay", relay);

  const config: RequestInit = {
    method: "POST",
    body: JSON.stringify(relay),
    headers: { "Content-Type": "application/json" }
  };

  const json = await fetchJson(RELAY_URL, config);

  console.log("queryTheRelay ~ json", json);
  return json;
};

export { queryTheRelay };