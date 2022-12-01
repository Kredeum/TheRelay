import { TheQueryParamsType, THERELAY_URL_DEFAULT } from "@lib/types";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { queryTheRelay } from "@lib/query/queryTheRelay";

const queryTheGraph = async (endpoint: string, query: string, params?: TheQueryParamsType): Promise<unknown> => {
  return params?.therelay ?
    await queryTheRelay(endpoint, query, params) :
    await queryGraphQL(endpoint, query, params);
};

export { queryTheGraph };
