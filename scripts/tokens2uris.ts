import type { TheGraphQLResponse } from "@lib/theGraphQL";
import { theGraphQL } from "@lib/theGraphQL";
import fs from "fs";

theGraphQL("zapaz/eip721-mumbai", "tokens2uris")
  .then((json: TheGraphQLResponse): void => {
    // console.log(json);
    if (json.errors) return;

    const { tokens } = json.data as { tokens: Array<{ id: string; uri: string }> };
    const urisJson = JSON.stringify(tokens, null, 2);
    console.log(urisJson);

    const chainId = 80001;
    const urisDir = `datas/${chainId}`;
    fs.mkdirSync(urisDir, { recursive: true });
    fs.writeFileSync(`${urisDir}/uris.json`, urisJson, "utf8");
  })
  .catch(console.error);
