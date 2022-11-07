import type { GraphQLResponse } from "@lib/graphQL";
import { graphQL } from "@lib/graphQL";
import { getQuery } from "@lib/getQuery";

const main = async (): Promise<GraphQLResponse> => {
  if (process.argv.length < 4) throw "Usage: ts-snode queryGraphQL.ts <endpointUrl> <queryPath> <queryParams?>";

  const endpointUrl = process.argv[2];
  const query = getQuery(process.argv[3], process.argv[4]);

  return await graphQL(endpointUrl, query);
};

main()
  .then((res: GraphQLResponse) => {
    console.log(JSON.stringify(res.data, null, "  "));
  })
  .catch(console.error);
