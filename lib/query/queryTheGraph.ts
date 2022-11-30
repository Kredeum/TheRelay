import { OptionsType, THERELAY_URL_DEFAULT } from "@lib/types";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { queryTheRelay } from "@lib/query/queryTheRelay";

const queryTheGraph = async (endpoint: string, query: string, options?: OptionsType): Promise<unknown> => {
  const therelayUrl = options?.therelayUrl ? options.therelayUrl : (options?.therelay ? THERELAY_URL_DEFAULT : "");

  return therelayUrl ?
    await queryTheRelay(therelayUrl, endpoint, query, options) :
    await queryGraphQL(endpoint, query, options);
};

export { queryTheGraph };
