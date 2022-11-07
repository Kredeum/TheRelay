import type { RequestInit } from "node-fetch";

import { PORT, RelayType } from "@lib/common";
import { fetchJson } from "@lib/fetchJson";
import { getQuery } from "@lib/getQuery";

const main = async (): Promise<string> => {
  if (process.argv.length < 4) throw "Usage: ts-snode queryRelay.ts <graphName> <queryName> <queryParams?>";

  const endpointUrl = `https://api.thegraph.com/subgraphs/name/${process.argv[2]}`;
  const query = getQuery(`req/${process.argv[2]}/${process.argv[3]}.gql`, process.argv[4]);

  const relayUrl = `http://127.0.0.1:${PORT}`;


  const relay: RelayType = { endpointUrl, query };

  const config: RequestInit = {
    method: "POST",
    body: JSON.stringify(relay),
    headers: { "Content-Type": "application/json" }
  };

  return await fetchJson(relayUrl, config);
};

main()
  .then((res: string) => {
    console.log(JSON.stringify(res, null, "  "));
  })
  .catch(console.error);
