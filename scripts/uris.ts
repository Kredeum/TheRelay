import fetch from "node-fetch";
import fs from "fs";

type FetchResponse = {
  data?: { erc721Tokens: Array<{ id: string; uri: string }> };
  error?: string;
};

const chainId = 137;

async function _graphQL(url: string, query: string): Promise<void> {
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
  const urisJson = JSON.stringify(json.data?.erc721Tokens, null, 2);
  console.log(urisJson);

  const urisDir = `datas/${chainId}`;
  fs.mkdirSync(urisDir, { recursive: true });
  fs.writeFileSync(`${urisDir}/uris.json`, urisJson, "utf8");
}

const url = "https://api.thegraph.com/subgraphs/name/amxx/nft-matic";
const queryFile = "req/amxx/nft-matic/uris.gql";
const query = fs.readFileSync(queryFile, "utf8");

_graphQL(url, query);
