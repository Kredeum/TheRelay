import fs from "fs";

const readMetadata = (address: string, tokenID: string, chainId = 0): unknown => {
  let metadata: unknown = "";

  const dir = `datas/${chainId}/${address}/${tokenID}`;

  if (fs.existsSync(dir)) {
    const allFiles = fs.readdirSync(dir);
    if (allFiles.length) metadata = JSON.parse(fs.readFileSync(`${dir}/${allFiles[0]}`, "utf8")) || "";
  }

  return metadata;
};

export { readMetadata };
