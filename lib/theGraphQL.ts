import fetch from "node-fetch";
import Handlebars from "handlebars";
import fs from "fs";

type TheGraphQLResponse = {
  data?: unknown;
  errors?: string;
};

const theGraphQL = async (graphName: string, queryName: string, queryParams = {}): Promise<TheGraphQLResponse> => {
  const url = `https://api.thegraph.com/subgraphs/name/${graphName}`;
  const file = `req/${graphName}/${queryName}.gql`;

  if (!fs.existsSync(file)) throw `File '${file}' does not exists!`;
  const queryRaw = fs.readFileSync(file, "utf8");

  const template = Handlebars.compile(queryRaw);
  const query = template(queryParams);

  return graphQL(url, query);
};

const graphQL = async (url: string, query: string): Promise<TheGraphQLResponse> => {
  console.info(`${url}\n${query}`);

  let json: TheGraphQLResponse = {};
  const config = { method: "POST", body: JSON.stringify({ query: query }) };

  try {
    const res = await fetch(url, config);
    // console.log("theGraphQL", res);

    json = (await res.json()) as TheGraphQLResponse;
    // console.log("theGraphQL", json);
  } catch (e) {
    console.error("theGraphQL fetch ERROR", e);
  }

  // console.log(json);
  return json;
};

export { theGraphQL, graphQL };
export type { TheGraphQLResponse };
