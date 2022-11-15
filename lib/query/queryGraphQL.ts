import type { RequestInit } from "node-fetch";
import type { QueryGraphQLResponseType, QueryOptionsType } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";



const queryGraphQLResponse = async (endpoint: string, body = {}): Promise<QueryGraphQLResponseType> => {
  // console.info(`${endpoint}\n${query}`);

  const config: RequestInit = { method: "POST", body: JSON.stringify(body) };

  const resp = (await fetchJson(endpoint, config)) as QueryGraphQLResponseType;

  return resp;
};

const queryGraphQL = async (endpoint: string, query: string, options?: QueryOptionsType): Promise<string> => {
  if (options?.logs) console.info(`${endpoint}\n${query}`);

  const resp = await queryGraphQLResponse(endpoint, { query });
  // console.log("queryGraphQL", JSON.stringify(resp, null, "  "));

  // if (resp.errors) throw `queryGraphQL ERROR, ${JSON.stringify(resp.errors, null, "  ")}`;

  const json = JSON.stringify(resp.data || {}, null, "  ");

  // console.log("queryGraphQL", json);
  return json;
};

export { queryGraphQL, queryGraphQLResponse };
export type { QueryGraphQLResponseType };
