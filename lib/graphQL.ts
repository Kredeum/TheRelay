import type { RequestInit } from "node-fetch";
import { fetchJson } from "@lib/fetchJson";

type GraphQLResponse = {
  data?: unknown;
  errors?: string;
};

const graphQL = async (enpointUrl: string, query: string): Promise<GraphQLResponse> => {
  console.info(`${enpointUrl}\n${query}`);

  const config: RequestInit = { method: "POST", body: JSON.stringify({ query: query }) };

  const json = (await fetchJson(enpointUrl, config)) as GraphQLResponse;

  // console.log("graphQL", json);
  return json;
};

export { graphQL };
export type { GraphQLResponse };
