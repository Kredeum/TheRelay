import { OptionsType, THERELAY_URL } from "@lib/types";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { queryTheRelay } from "@lib/query/queryTheRelay";

const queryTheGraph = async (endpoint: string, query: string, options?: OptionsType): Promise<unknown> => {
  const relayUrl = options?.relayUrl ? options.relayUrl : (options?.relay ? THERELAY_URL : "");

  return relayUrl ?
    await queryTheRelay(relayUrl, endpoint, query, options) :
    await queryGraphQL(endpoint, query, options);
};

export { queryTheGraph };
