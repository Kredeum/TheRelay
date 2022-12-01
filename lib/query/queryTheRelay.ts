import type { RequestInit } from "node-fetch";
import { TheRelayParamsType, THERELAY_STARTING } from "@lib/types";

import { fetchJson } from "@lib/fetch/fetchJson";
import { theRelayStart, theRelayStop } from "@lib/theRelay";

const queryTheRelay = async (endpoint: string, query: string, params: TheRelayParamsType): Promise<unknown> => {
  if (params?.verbose) console.info(`${endpoint}\n${query}`);

  const config: RequestInit = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  // console.log("queryTheRelay", config);

  const url = `${params?.therelayUrl || ""}/${endpoint.replace("https://", "")}`;
  // console.log("queryTheRelay", url);

  let status = "";
  if (params?.therelay) status = await theRelayStart(params);

  const json = await fetchJson(url, config, false);

  if (status == THERELAY_STARTING) await theRelayStop();

  // console.log("queryTheRelay", json);
  return json;
};

export { queryTheRelay };