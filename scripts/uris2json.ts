import fs from "fs";
import { BigNumber } from "ethers";
import { callFetchJson } from "@lib/callFetchJson";


const chainId = 137;

type UriGqlType = {
  id: string;
  uri: string;

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

  const metadata = await callFetchJson(tokenURI);
  const nft = { chainId, collection, tokenID, tokenURI, metadata };
  const medataJson = JSON.stringify(nft, null, 2);
  console.log(nft);

  const tokenDir = `datas/${chainId}/${collection}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/metadata.json`, medataJson, "utf8");
};

const uris2json = async (uris: UriGqlType[]) => {
  console.log("uris2json ~ uris", uris);

  for (const uri of uris) {
    await uri2json(uri);
  }
};

const main = async () => {
  const urisFile = process.argv[2] || "datas/137/uris.json";
  const urisJson = fs.readFileSync(urisFile, "utf8");
  const uris = JSON.parse(urisJson) as Array<UriGqlType>;
  // console.log("main ~ uris", uris);

  await uris2json(uris);
};

main().catch(console.error);
