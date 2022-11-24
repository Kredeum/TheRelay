import type { GraphQLResponseType, OptionsType } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";

const queryGraphQLResponse = async (endpoint: string, query: string): Promise<GraphQLResponseType> => {
  // console.info(`queryGraphQLResponse ${endpoint}\n${query}`);

  const config = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-type": "application/json" }
  };

  const resp = (await fetchJson(endpoint, config)) as GraphQLResponseType;

  return resp;
};

const queryGraphQL = async (endpoint: string, query: string, options?: OptionsType): Promise<string> => {
  if (options?.logs) console.info(`${endpoint}\n${query}`);

  const resp = await queryGraphQLResponse(endpoint, query);
  // console.log("queryGraphQL", JSON.stringify(resp, null, "  "));

  // if (resp.errors) throw `queryGraphQL ERROR, ${JSON.stringify(resp.errors, null, "  ")}`;

  const json = JSON.stringify(resp.data || {}, null, "  ");

  // console.log("queryGraphQL", json);
  return json;
};

export { queryGraphQL, queryGraphQLResponse };
export type { GraphQLResponseType };
