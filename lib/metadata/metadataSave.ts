import fs from "fs";

const metadataSave = (json: unknown, address: string, tokenID: string, chainId = 0): void => {
  const tokenDir = `datas/${chainId}/${address}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/metadata.json`, JSON.stringify(json, null, "  "), "utf8");
};

export { metadataSave };