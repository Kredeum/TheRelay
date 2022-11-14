import fs from "fs";

const readMetadata = (address: string, tokenID: string, chainId = 0): unknown => {
  const metadataFile = `datas/${chainId}/${address}/${tokenID}/metadata.json`;

  return fs.existsSync(metadataFile) ? JSON.parse(fs.readFileSync(metadataFile, "utf8")) : "";
};

export { readMetadata };