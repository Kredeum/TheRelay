import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const queryGetPreprocessed = (query: string, queryVariables = {}): string =>
  Handlebars.compile(query, { noEscape: true })(queryVariables);


const queryGetByFile = (queryFile: string, queryVariables = {}): string => {
  if (!fs.existsSync(queryFile)) throw `Query file '${queryFile}' does not exists!`;

  const fragmentsFile = `${path.dirname(queryFile)}/fragments.gql`;
  const fragments = fs.existsSync(fragmentsFile) ? fs.readFileSync(fragmentsFile, "utf8") : "";

  return `${queryGetPreprocessed(fs.readFileSync(queryFile, "utf8"), queryVariables)}\n${fragments}`;
};

const queryGetSubgraphDescription = (graphName: string): unknown => {
  const descriptionFile = `queries/${graphName}/metadata.json`;
  if (!fs.existsSync(descriptionFile)) throw `File '${descriptionFile}' does not exists!`;

  const descriptionJson = fs.readFileSync(descriptionFile, "utf8");
  // console.log("queryGetSubgraphDescription", descriptionJson);

  return JSON.parse(descriptionJson) as unknown;
};

const queryGetByPath = (queryPath: string, queryVariables = {}): string =>
  queryGetByFile(`queries/${queryPath}.gql`, queryVariables);

const queryGetByName = (graphName: string, queryName: string, queryVariables = {}): string =>
  queryGetByPath(`${graphName}/${queryName}`, queryVariables);

const queryGetTheGraphEndpoint = (graphName: string): string => {
  // console.log("queryGetTheGraphEndpoint", graphName);

  const endpoint = (queryGetSubgraphDescription(graphName) as { endpoint: string }).endpoint;

  return endpoint;
};

export {
  queryGetPreprocessed, queryGetByFile, queryGetByPath, queryGetByName,
  queryGetTheGraphEndpoint, queryGetSubgraphDescription
};
