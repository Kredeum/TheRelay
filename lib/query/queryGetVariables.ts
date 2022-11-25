import { OptionsType, QueryVariablesType } from "@lib/types";

const queryGetVariables = (options: OptionsType): QueryVariablesType => {
  const queryVariables: QueryVariablesType = {};
  const whereNfts: Array<string> = [];
  const whereCollections: Array<string> = [];
  const filterNfts: Array<string> = [];
  const filterCollections: Array<string> = [];

  if (options.first) {
    queryVariables.first = String(options.first);
    const filterFirst = `first: ${queryVariables.first}`;

    filterNfts.push(filterFirst);
    filterCollections.push(filterFirst);
  }
  if (options.skip) {
    queryVariables.skip = String(options.skip);
    const filterSkip = `skip: ${queryVariables.skip}`;

    filterNfts.push(filterSkip);
    filterCollections.push(filterSkip);
  }

  if (options.collectionAddress) {
    queryVariables.collectionAddress = String(options.collectionAddress).toLowerCase();
    const whereNftsCollectionAddress = `contract: "${queryVariables.collectionAddress}"`;
    const whereCollectionsCollectionAddress = `id: "${queryVariables.collectionAddress}"`;

    whereNfts.push(whereNftsCollectionAddress);
    whereCollections.push(whereCollectionsCollectionAddress);
  }
  if (options.ownerAddress) {
    queryVariables.ownerAddress = String(options.ownerAddress).toLowerCase();
    const whereOwnerAddress = `owner: "${queryVariables.ownerAddress}"`;

    whereNfts.push(whereOwnerAddress);
    whereCollections.push(whereOwnerAddress);
  }
  if (options.tokenId) {
    queryVariables.tokenId = String(options.tokenId);
    const whereTokenId = `tokenID: "${queryVariables.tokenId}"`;

    whereNfts.push(whereTokenId);
  }

  if (whereNfts.length) {
    queryVariables.whereNfts = `where: { ${whereNfts.join(", ")}}`;
    filterNfts.push(queryVariables.whereNfts);
  }
  if (whereCollections.length) {
    queryVariables.whereCollections = `where: { ${whereCollections.join(", ")}}`;
    filterCollections.push(queryVariables.whereCollections);
  }

  if (filterNfts.length) {
    queryVariables.filterNfts = `( ${filterNfts.join(", ")} )`;
  }
  if (filterCollections.length) {
    queryVariables.filterCollections = `( ${filterCollections.join(", ")} )`;
  }

  // console.log("queryGetVariables", queryVariables);
  return queryVariables;
};

export { queryGetVariables };
