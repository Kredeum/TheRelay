import Handlebars from "handlebars";
import fs from "fs";

const getQueryPreprocessed = (query: string, queryParams = {}): string => Handlebars.compile(query)(queryParams);

const getQueryByFile = (queryFile: string, queryParams = {}): string => {
  if (!fs.existsSync(queryFile)) throw `File '${queryFile}' does not exists!`;

  return getQueryPreprocessed(fs.readFileSync(queryFile, "utf8"), queryParams);
};

const getQueryByPath = (queryPath: string, queryParams = {}): string =>
  getQueryByFile(`queries/${queryPath}.gql`, queryParams);

const getQueryByName = (graphName: string, queryName: string, queryParams = {}): string =>
  getQueryByPath(`${graphName}/${queryName}`, queryParams);

export { getQueryPreprocessed, getQueryByFile, getQueryByPath, getQueryByName };
