import Handlebars from "handlebars";
import fs from "fs";
import { THEGRAPH_BASE_ENDPOINT } from "@lib/types";

const queryGetPreprocessed = (query: string, queryParams = {}): string => Handlebars.compile(query)(queryParams);

const queryGetByFile = (queryFile: string, queryParams = {}): string => {
  if (!fs.existsSync(queryFile)) throw `File '${queryFile}' does not exists!`;

  return queryGetPreprocessed(fs.readFileSync(queryFile, "utf8"), queryParams);
};

const queryGetByPath = (queryPath: string, queryParams = {}): string =>
  queryGetByFile(`queries/${queryPath}.gql`, queryParams);

const queryGetByName = (graphName: string, queryName: string, queryParams = {}): string =>
  queryGetByPath(`${graphName}/${queryName}`, queryParams);

const queryGetTheGraphEndpoint = (graphName: string): string =>
  `${THEGRAPH_BASE_ENDPOINT}/${graphName}`;

const queryGetSubgraphName = (subgraph: string): string =>
  subgraph.replace(`${THEGRAPH_BASE_ENDPOINT}/`, "");

export {
  queryGetPreprocessed, queryGetByFile, queryGetByPath, queryGetByName,
  queryGetSubgraphName, queryGetTheGraphEndpoint
};
