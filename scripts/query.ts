import type { TheGraphQLResponse } from "@lib/theGraphQL";
import { theGraphQL } from "@lib/theGraphQL";

const main = async () => {
  if (process.argv.length < 4) throw "Usage: ts-snode query.ts <graphName> <queryName>";

  let queryParams = {};
  if (process.argv.length > 4) queryParams = { collectionAddress: process.argv[4] };

  return await theGraphQL(process.argv[2], process.argv[3], queryParams).then((res: TheGraphQLResponse) => {
    console.log(JSON.stringify(res.data, null, "  "));
  });
};

main().catch(console.error);
