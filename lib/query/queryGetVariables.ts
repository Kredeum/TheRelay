import { TheQueryParamsType, TheQueryVariablesType } from "@lib/types";

const queryGetVariables = (params: TheQueryParamsType): TheQueryVariablesType => {
  const queryVariables: TheQueryVariablesType = {};
  const whereNfts: Array<string> = [];
  const whereCollections: Array<string> = [];
  const filterNfts: Array<string> = [];
  const filterCollections: Array<string> = [];

  if (params.first) {
    queryVariables.first = String(params.first);
    const filterFirst = `first: ${queryVariables.first}`;

    filterNfts.push(filterFirst);
    filterCollections.push(filterFirst);
  }
  if (params.skip) {
    queryVariables.skip = String(params.skip);
    const filterSkip = `skip: ${queryVariables.skip}`;

    filterNfts.push(filterSkip);
    filterCollections.push(filterSkip);
  }

  if (params.collectionAddress) {
    queryVariables.collectionAddress = String(params.collectionAddress).toLowerCase();
    const whereNftsCollectionAddress = `contract: "${queryVariables.collectionAddress}"`;
    const whereCollectionsCollectionAddress = `id: "${queryVariables.collectionAddress}"`;

    whereNfts.push(whereNftsCollectionAddress);
    whereCollections.push(whereCollectionsCollectionAddress);
  }
  if (params.ownerAddress) {
    queryVariables.ownerAddress = String(params.ownerAddress).toLowerCase();
    const whereOwnerAddress = `owner: "${queryVariables.ownerAddress}"`;

    whereNfts.push(whereOwnerAddress);
    whereCollections.push(whereOwnerAddress);
  }
  if (params.tokenId) {
    queryVariables.tokenId = String(params.tokenId);
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
