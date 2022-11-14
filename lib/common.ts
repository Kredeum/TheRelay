const RELAY_PROTOCOL = "http";
const RELAY_DOMAIN = "127.0.0.1";
const RELAY_PORT = 4004;
const RELAY_URL = `${RELAY_PROTOCOL}://${RELAY_DOMAIN}:${RELAY_PORT}`;

type QueryType = {
  endpointUrl: string;
  query: string;
}

type QueryOptionsType = {
  collectionAddress?: string;
  logs?: boolean;
}

export { RELAY_PROTOCOL, RELAY_DOMAIN, RELAY_PORT, RELAY_URL, QueryType, QueryOptionsType };