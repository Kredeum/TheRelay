import fs from "fs";
import { BigNumber } from "ethers";
import { fetchJson } from "@lib/fetchJson";

const chainId = 80001;

type UriGqlType = { uri?: string; tokenURI?: string; id: string };

const uri2json = async (uriGql: UriGqlType) => {
  console.log(uriGql);

  const res = uriGql.id.split(/_|\//);
  if (res.length != 2) {
    console.error("ERROR token id", uriGql.id);
    return;
  }

  const [coll, tokId] = res;

  const collection = coll;
  const tokenID = BigNumber.from(tokId).toString();
  const tokenURI = uriGql.uri || uriGql.tokenURI || "";

  const metadata = await fetchJson(tokenURI);
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
  const urisFile = process.argv[2] || `datas/${chainId}/uris.json`;
  const urisJson = fs.readFileSync(urisFile, "utf8");
  const uris = JSON.parse(urisJson) as Array<UriGqlType>;
  // console.log("main ~ uris", uris);

  await uris2json(uris);
};

main().catch(console.error);
