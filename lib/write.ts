const saveMetadataFromTokenURI = (metadata: string): string => {
  const tokenURI = uriGql.uri || uriGql.tokenURI || "";
  const metadata = await fetchJson(tokenURI);

};


const saveMetadataFromJson = (metadata: string): void => {


  const nft = { chainId, collection, tokenID, tokenURI, metadata };
  const medataJson = JSON.stringify(nft, null, 2);
  console.log(nft);

  const tokenDir = `datas/${chainId}/${collection}/${tokenID}`;
  fs.mkdirSync(tokenDir, { recursive: true });
  fs.writeFileSync(`${tokenDir}/metadata.json`, medataJson, "utf8");


};

export { saveMetadata };
