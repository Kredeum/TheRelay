import type { CallGraphQLResponse } from "@lib/callGraphQL";
import { callGraphQL } from "@lib/callGraphQL";
import fs from "fs";

const defaultReq = process.argv.length >= 3 ? process.argv[2] : "zapaz/eip721-mumbai/owners";
const url = `https://api.thegraph.com/subgraphs/name/${defaultReq.substr(0, defaultReq.lastIndexOf("/"))}`;
const queryFile = `req/${defaultReq}.gql`;

const query = fs.readFileSync(queryFile, "utf8");

callGraphQL(url, query)
  .then((res: CallGraphQLResponse) => {
    console.log(JSON.stringify(res.data, null, "  "));
  })
  .catch(console.error);
