import type { RequestInit } from "node-fetch";
import { fetchJson } from "@lib/fetchJson";

type QueryGraphQLResponse = {
  data?: unknown;
  errors?: string;
};

const queryGraphQLResponse = async (enpointUrl: string, body = {}): Promise<QueryGraphQLResponse> => {
  // console.info(`${enpointUrl}\n${query}`);

  const config: RequestInit = { method: "POST", body: JSON.stringify(body) };

  const resp = (await fetchJson(enpointUrl, config)) as QueryGraphQLResponse;

  return resp;
};

const queryGraphQL = async (enpointUrl: string, query: string): Promise<string> => {
  // console.info(`${enpointUrl}\n${query}`);

  const resp = await queryGraphQLResponse(enpointUrl, { query });

  if (resp.errors) throw `queryGraphQL ERROR", ${resp.errors}`;

  const json = JSON.stringify(resp.data || {}, null, "  ");

  // console.log("queryGraphQL", json);
  return json;
};

export { queryGraphQL, queryGraphQLResponse };
export type { QueryGraphQLResponse };
