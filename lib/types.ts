const PACKAGE_VERSION = "0.0.5";

const IPFS_RUNNING = "RUNNING";
const IPFS_STOPPED = "STOPPED";

const THERELAY_API_DEFAULT = "http://127.0.0.1:5001";

const THERELAY_URL_DEFAULT = "http://127.0.0.1:4004";
const THERELAY_URL = process.env.THERELAY_URL || THERELAY_URL_DEFAULT;

const THERELAY_RUNNING = "RUNNING";
const THERELAY_STOPPING = "STOPPING";
const THERELAY_STOPPED = "STOPPED";
const THERELAY_ERROR = "THERELAY ERROR";
const THERELAY_STARTING = "STARTING";

type GraphQLResponseType = {
  data?: unknown;
  errors?: string;
};

type CommonParamsType = {
  verbose: boolean;
}

type IpfsParamsType = {
  ipfs: boolean;
  ipfsUrl?: string;
  ipfsApi?: string;
  ipfsGateway?: string;
} & CommonParamsType;


type TheRelayParamsType = {
  therelay: boolean;
  therelayUrl: string;
  save: boolean;
} & IpfsParamsType;

type TheQueryParamsAndVariablesType = {
  first?: string;
  skip?: string;
  chainId?: string;
  collectionAddress?: string;
  ownerAddress?: string;
  tokenId?: string;
}
type TheQueryVariablesType = {
  whereNfts?: string;
  whereCollections?: string;
  filterNfts?: string;
  filterCollections?: string;
} & TheQueryParamsAndVariablesType;

type TheQueryParamsType = {
  therelay?: boolean;
  therelayUrl?: string;
  ipfsHost?: string;
} & CommonParamsType & TheRelayParamsType & TheQueryParamsAndVariablesType;

type TheQueryType = {
  endpoint: string;
  queryPath: string;
  queryParams: TheQueryParamsType;
}

export {
  PACKAGE_VERSION, THERELAY_API_DEFAULT,
  IPFS_RUNNING, IPFS_STOPPED,
  THERELAY_URL, THERELAY_URL_DEFAULT,
  THERELAY_RUNNING, THERELAY_STOPPING, THERELAY_STOPPED, THERELAY_ERROR, THERELAY_STARTING
};
export type { TheQueryType, TheQueryParamsType, TheQueryVariablesType, IpfsParamsType, TheRelayParamsType, GraphQLResponseType };