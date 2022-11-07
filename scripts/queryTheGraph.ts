import type { GraphQLResponse } from "@lib/graphQL";
import { getQuery } from "@lib/getQuery";
import { graphQL } from "@lib/graphQL";

const main = async (): Promise<GraphQLResponse> => {
  if (process.argv.length < 4) throw "Usage: ts-snode queryTheGraph.ts <graphName> <queryName> <queryParams?>";

  const endpointUrl = `https://api.thegraph.com/subgraphs/name/${process.argv[2]}`;
  const query = getQuery(`req/${process.argv[2]}/${process.argv[3]}.gql`, process.argv[4]);

  return await graphQL(endpointUrl, query);
};

main()
  .then((res: GraphQLResponse) => {
    console.log(JSON.stringify(res.data, null, "  "));
  })
  .catch(console.error);
