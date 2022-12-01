import { ipfsCat } from "@lib/ipfs/ipfsCat";
import { theRelayParams } from "@lib/theRelay";
import fs from "fs";

const metadataGetCid = (chainId: number, address: string, tokenID: string): string => {
  const cidFile = `datas/${chainId}/${address}/${tokenID}/cid`;

  return fs.existsSync(cidFile) ? fs.readFileSync(cidFile, "utf8") : "";
};

const metadataGet = async (chainId: number, address: string, tokenID: string): Promise<unknown> => {
  // console.log("METADATA GET", chainId, address, tokenID);
  let metadata: unknown = "";
  let metadataJson = "";

  const dir = `datas/${chainId}/${address}/${tokenID}`;
  const cidFile = `${dir}/cid`;
  let cid = "";

  if (!fs.existsSync(cidFile)) return "";
  cid = fs.readFileSync(cidFile, "utf8");
  if (!cid) return "";

  const metadataFile = `${dir}/${cid}`;
  metadataJson = fs.existsSync(metadataFile) ?
    fs.readFileSync(metadataFile, "utf8") :
    await ipfsCat(cid, theRelayParams);
  if (!metadataJson) return "";

  metadata = JSON.parse(metadataJson);
  if (theRelayParams.verbose) console.log("METADATA GET", JSON.stringify(metadata, null, 2));

  return metadata;
};

export { metadataGet, metadataGetCid };
