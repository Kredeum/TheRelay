import { QueryOptionsType } from "@lib/types";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { queryTheRelay } from "@lib/query/queryTheRelay";

const queryTheGraph = async (endpoint: string, query: string, options?: QueryOptionsType): Promise<unknown> => {
  return options?.relayUrl ?
    await queryTheRelay(options.relayUrl, endpoint, query, options) :
    await queryGraphQL(endpoint, query, options);
};

export { queryTheGraph };
