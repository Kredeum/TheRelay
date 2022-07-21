import fetch from "node-fetch";
import fs from "fs";

type FetchResponse = {
  data?: string;
  error?: string;
};

async function _graphQL(url: string, query: string): Promise<string> {
  console.log(`_graphQL\n${url}\n${query}`);

  let json: FetchResponse = {};
  const config = { method: "POST", body: JSON.stringify({ query: query }) };

  try {
    const res = await fetch(url, config);
    // console.log(res);
    json = (await res.json()) as FetchResponse;
    // console.log("_graphQL ~ json", json);
  } catch (e) {
    console.error("_graphQL fetch ERROR", e);
  }

  if (json.error) {
    console.error("_graphQL json ERROR", json.error);
  }

  // console.log(json);
  return json.data || "";
}

const queryFile = process.argv[2] || "tokens.gql";
const url = process.argv[3] || "https://api.thegraph.com/subgraphs/name/zapaz/eip721-mumbai";
const query = fs.readFileSync(queryFile, "utf8");

_graphQL(url, query).then((res) => {
  console.log(JSON.stringify(res, null, "  "));
});
