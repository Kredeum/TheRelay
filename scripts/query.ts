import type { CallGraphQLResponse } from "@lib/callGraphQL";
import { callGraphQL } from "@lib/callGraphQL";
import fs from "fs";

const url = process.argv[2] || "https://api.thegraph.com/subgraphs/name/zapaz/eip721-mumbai";
const queryFile = process.argv[3] || "req/zapaz/eip721_mumbai/owners.gql";
const query = fs.readFileSync(queryFile, "utf8");

callGraphQL(url, query)
  .then((res: CallGraphQLResponse) => {
    console.log(JSON.stringify(res.data, null, "  "));
  })
  .catch(console.error);
