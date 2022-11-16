import Handlebars from "handlebars";
import fs from "fs";
import { THEGRAPH_BASE_ENDPOINT } from "@lib/types";

const queryGetPreprocessed = (query: string, queryParams = {}): string => Handlebars.compile(query)(queryParams);

const queryGetByFile = (queryFile: string, queryParams = {}): string => {
  if (!fs.existsSync(queryFile)) throw `File '${queryFile}' does not exists!`;

  return queryGetPreprocessed(fs.readFileSync(queryFile, "utf8"), queryParams);
};

const queryGetSubgraphDescription = (graphName: string): unknown => {
  const descriptionFile = `queries/${graphName}/metadata.json`;
  if (!fs.existsSync(descriptionFile)) throw `File '${descriptionFile}' does not exists!`;

  const descriptionJson = fs.readFileSync(descriptionFile, "utf8");
  // console.log("queryGetSubgraphDescription", descriptionJson);

  return JSON.parse(descriptionJson) as unknown;
};

const queryGetByPath = (queryPath: string, queryParams = {}): string =>
  queryGetByFile(`queries/${queryPath}.gql`, queryParams);

const queryGetByName = (graphName: string, queryName: string, queryParams = {}): string =>
  queryGetByPath(`${graphName}/${queryName}`, queryParams);

const queryGetTheGraphEndpoint = (graphName: string): string => {
  // console.log("queryGetTheGraphEndpoint", graphName);

  const endpoint = (queryGetSubgraphDescription(graphName) as { endpoint: string }).endpoint;

  return endpoint || `${THEGRAPH_BASE_ENDPOINT}/${graphName}`;
};

export {
  queryGetPreprocessed, queryGetByFile, queryGetByPath, queryGetByName,
  queryGetTheGraphEndpoint, queryGetSubgraphDescription
};
