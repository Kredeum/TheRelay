import Handlebars from "handlebars";
import fs from "fs";

const getQuery = (queryFile: string, queryParams = "{}"): string => {
  if (!fs.existsSync(queryFile)) throw `File '${queryFile}' does not exists!`;

  const template = Handlebars.compile(fs.readFileSync(queryFile, "utf8"));

  return template(JSON.parse(queryParams));
};

export { getQuery };
