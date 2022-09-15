import type { CallGraphQLResponse } from "@lib/callGraphQL";
import { callGraphQL } from "@lib/callGraphQL";
import fs from "fs";

const url = "https://api.thegraph.com/subgraphs/name/zapaz/eip721-mumbai";
const queryFile = "req/zapaz/eip721_mumbai/tokens.gql";
const query = fs.readFileSync(queryFile, "utf8");

callGraphQL(url, query)
  .then((json: CallGraphQLResponse): void => {
    // console.log(json);
    if (json.errors) return;

    const { tokens } = json.data as { tokens: Array<{ id: string; uri: string }> };
    const urisJson = JSON.stringify(tokens, null, 2);
    console.log(urisJson);

    // const chainId = 137;
    // const urisDir = `datas/${chawinId}`;
    // fs.mkdirSync(urisDir, { recursive: true });
    // fs.writeFileSync(`${urisDir}/uris.json`, urisJson, "utf8");
  })
  .catch(console.error);
