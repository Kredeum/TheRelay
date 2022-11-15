const THERELAY_PROTOCOL = "http";
const THERELAY_DOMAIN = "127.0.0.1";
const THERELAY_PORT = 4004;
const THERELAY_URL = `${THERELAY_PROTOCOL}://${THERELAY_DOMAIN}:${THERELAY_PORT}`;

const THERELAY_RUNNING = "RUNNING";
const THERELAY_STOPPING = "STOPPING";
const THERELAY_STOPPED = "STOPPED";
const THERELAY_ERROR = "ERROR";
const THERELAY_STARTING = "STARTING";

const THEGRAPH_BASE_API = "https://api.thegraph.com";
const THEGRAPH_BASE_ENDPOINT = `${THEGRAPH_BASE_API}/subgraphs/name`;

type QueryType = {
  endpoint: string;
  query: string;
}

type QueryOptionsType = {
  relay?: boolean;
  relayUrl?: string;
  collectionAddress?: string;
  logs?: boolean;
}

type QueryGraphQLResponseType = {
  data?: unknown;
  errors?: string;
};

export {
  THEGRAPH_BASE_ENDPOINT,
  THERELAY_PROTOCOL, THERELAY_DOMAIN, THERELAY_PORT, THERELAY_URL,
  THERELAY_RUNNING, THERELAY_STOPPING, THERELAY_STOPPED, THERELAY_ERROR, THERELAY_STARTING
};
export type { QueryType, QueryOptionsType, QueryGraphQLResponseType };