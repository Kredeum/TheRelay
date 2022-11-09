import type { RequestInit } from "node-fetch";

import { RELAY_URL, QueryType } from "@lib/common";
import { fetchJson } from "@lib/fetchJson";
import { getEndpointTheGraph } from "@lib/getEndpoint";

const queryTheRelay = async (graphName: string, query: string): Promise<string> => {
  console.log("queryTheRelay", graphName, query);

  const endpointUrl = getEndpointTheGraph(graphName);

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