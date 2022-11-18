import fs from "fs";
import { ipfsAdd } from "@lib/ipfs/ipfsAdd";

const metadataSaveToFile = (json: string, cid: string, address: string, tokenID: string, chainId = 0): void => {
  const tokenDir = `datas/${chainId}/${address}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/${cid}`, json, "utf8");

  const ipfsDir = "datas/ipfs";
  fs.mkdirSync(ipfsDir, { recursive: true });
  fs.writeFileSync(`${ipfsDir}/${cid}`, json, "utf8");
};

const metadataSaveToIpfs = ipfsAdd;

const metadataSave = async (jsonObject: unknown, address: string, tokenID: string, chainId = 0): Promise<string> => {
  const jsonString = JSON.stringify(jsonObject, null, "  ");
  const cid = await metadataSaveToIpfs(jsonString);
  metadataSaveToFile(jsonString, cid, address, tokenID, chainId);
  return cid;
};

export { metadataSave, metadataSaveToFile, metadataSaveToIpfs };