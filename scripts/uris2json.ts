import fetch from "node-fetch";
import fs from "fs";
import { BigNumber } from "ethers";

type FetchResponse = {
  data?: string;
  error?: string;
};

const chainId = 137;

type UriGqlType = {
  id: string;
  uri: string;
};
type UriType = {
  chainId: number;
  collection: string;
  tokenID: string;
  tokenURI: string;
};

const fetchJson = async (url: string): Promise<string> => {
  console.log(`fetchJson ${url}`);

  let json = "{}";
  const config = { method: "GET" };

  try {
    const res = await fetch(url, config);
    json = await res.json();
  } catch (e) {
    console.error("fetchJson fetch ERROR", e);
  }
  console.log(json);
  return json;
};

const uri2json = async (uriGql: UriGqlType) => {
  console.log(uriGql);

  const res = uriGql.id.split("/");
  if (res.length != 2) {
    console.error("ERROR token id", uriGql.id);
    return;
  }

  const [coll, tokId] = res;

  const collection = coll;
  const tokenID = BigNumber.from(tokId).toString();
  const tokenURI = uriGql.uri;

  const metadata = await fetchJson(tokenURI);
  const nft = { chainId, collection, tokenID, tokenURI, metadata };
  const medataJson = JSON.stringify(nft, null, 2);
  console.log(nft);

  const tokenDir = `datas/${chainId}/${collection}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/metadata.json`, medataJson, "utf8");
};

const uris2json = (uris: UriGqlType[]) => {
  console.log("uris2json ~ uris", uris);

  for (const uri of uris) {
    uri2json(uri);
  }
};

const main = () => {
  const urisFile = process.argv[2] || "datas/137/uris.json";
  const urisJson = fs.readFileSync(urisFile, "utf8");
  const uris = JSON.parse(urisJson);
  // console.log("main ~ uris", uris);

  uris2json(uris);
};

main();
