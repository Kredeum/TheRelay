// const THERELAY_URL = process.env.THERELAY_URL || "http://therelay.kredeum.com";
// const THERELAY_PORT = process.env.THERELAY_PORT || 80;

const THERELAY_URL = process.env.THERELAY_URL || "http://127.0.0.1:4004";
const THERELAY_PORT = process.env.THERELAY_PORT || 4004;

const THERELAY_RUNNING = "RUNNING";
const THERELAY_STOPPING = "STOPPING";
const THERELAY_STOPPED = "STOPPED";
const THERELAY_ERROR = "ERROR";
const THERELAY_STARTING = "STARTING";

type ParamsType = {
  first?: string;
  skip?: string;
  collectionAddress?: string;
  ownerAddress?: string;
  tokenId?: string;
}

type QueryVariablesType = {
  whereNfts?: string;
  whereCollections?: string;
  filterNfts?: string;
  filterCollections?: string;
} & ParamsType;

type QueryType = {
  endpoint: string;
  queryPath: string;
  queryVariables: QueryVariablesType;
}

type OptionsType = {
  therelay?: boolean;
  therelayUrl?: string;
  ipfsHost?: string;
  ipfsGatewayPort?: string;
  ipfsGatewayUrl?: string;
  ipfsApiPort?: string;
  ipfsApiUrl?: string;
  logs?: boolean;

} & ParamsType;


type GraphQLResponseType = {
  data?: unknown;
  errors?: string;
};

export {
  THERELAY_PORT, THERELAY_URL,
  THERELAY_RUNNING, THERELAY_STOPPING, THERELAY_STOPPED, THERELAY_ERROR, THERELAY_STARTING
};
export type { QueryType, ParamsType, QueryVariablesType, OptionsType, GraphQLResponseType };