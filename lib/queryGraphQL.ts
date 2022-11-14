import type { RequestInit } from "node-fetch";
import { fetchJson } from "@lib/fetchJson";
import { QueryOptionsType } from "./common";

type QueryGraphQLResponse = {
  data?: unknown;
  errors?: string;
};

const queryGraphQLResponse = async (endpointUrl: string, body = {}): Promise<QueryGraphQLResponse> => {
  // console.info(`${endpointUrl}\n${query}`);

  const config: RequestInit = { method: "POST", body: JSON.stringify(body) };

  const resp = (await fetchJson(endpointUrl, config)) as QueryGraphQLResponse;

  return resp;
};

const queryGraphQL = async (endpointUrl: string, query: string, options?: QueryOptionsType): Promise<string> => {
  if (options?.logs) console.info(`${endpointUrl}\n${query}`);

  const resp = await queryGraphQLResponse(endpointUrl, { query });

  if (resp.errors) throw `queryGraphQL ERROR, ${JSON.stringify(resp.errors, null, "  ")}`;

  const json = JSON.stringify(resp.data || {}, null, "  ");

  // console.log("queryGraphQL", json);
  return json;
};

export { queryGraphQL, queryGraphQLResponse };
export type { QueryGraphQLResponse };
