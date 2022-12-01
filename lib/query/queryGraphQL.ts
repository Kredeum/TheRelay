import type { GraphQLResponseType, TheQueryParamsType } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";

const queryGraphQLResponse = async (endpoint: string, query: string, verbose = true): Promise<GraphQLResponseType> => {
  // console.info(`queryGraphQLResponse ${endpoint}\n${query}`);

  const config = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-type": "application/json" }
  };

  const resp = (await fetchJson(endpoint, config, verbose)) as GraphQLResponseType;

  return resp;
};

const queryGraphQL = async (endpoint: string, query: string, params?: TheQueryParamsType): Promise<string> => {
  if (params?.verbose) console.info(`${endpoint}\n${query}`);

  const resp = await queryGraphQLResponse(endpoint, query, params?.verbose);
  // console.log("queryGraphQL", JSON.stringify(resp, null, 2));

  // if (resp.errors) throw `GRAPHQL ERROR, ${JSON.stringify(resp.errors, null, 2)}`;

  const json = JSON.stringify(resp.data || {}, null, 2);

  // console.log("queryGraphQL", json);
  return json;
};

export { queryGraphQL, queryGraphQLResponse };
export type { GraphQLResponseType };
