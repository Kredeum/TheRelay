import fs from "fs";

import type { TheRelayParamsType } from "@lib/types";
import { ipfsAdd } from "@lib/ipfs/ipfsAdd";
import { ipfsCid } from "@lib/ipfs/ipfsCid";
import { theRelayParams } from "@lib/theRelay";

const metadataSaveToFile = (json: string, cid: string, chainId: number, address: string, tokenID: string, params: TheRelayParamsType): void => {

  if (!(json && cid && address && tokenID)) {
    console.error(`FILE ADD ERROR : '${cid}' '${chainId}' '${address}' '${tokenID}'`, json);
    return;
  }

  const tokenDir = `datas/${chainId}/${address}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/cid`, cid, "utf8");
  console.info("CID  ADD", cid);

  if (params.save) {
    fs.writeFileSync(`${tokenDir}/${cid}`, json, "utf8");

    const ipfsDir = "datas/ipfs";
    fs.mkdirSync(ipfsDir, { recursive: true });
    fs.writeFileSync(`${ipfsDir}/${cid}`, json, "utf8");

    console.info("FILE ADD", cid);
  }

};


const metadataSave = async (jsonObject: unknown, address: string, tokenID: string, chainId = 0): Promise<string> => {
  const jsonString = JSON.stringify(jsonObject, null, "  ");
  let cid: string;

  // Add json to IPFS
  cid = await ipfsAdd(jsonString, theRelayParams);

  // If IPFS inactive cid null, so calculate cid
  cid ||= await ipfsCid(jsonString);

  // Save CID and add json to FileSystem
  metadataSaveToFile(jsonString, cid, chainId, address, tokenID, theRelayParams);

  return cid;
};

const metadataSaveToIpfs = ipfsAdd;

export { metadataSave, metadataSaveToFile, metadataSaveToIpfs };