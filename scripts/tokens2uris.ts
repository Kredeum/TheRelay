import { getEndpointTheGraph } from "@lib/getEndpoint";
import { getQueryByName } from "@lib/getQuery";
import { queryGraphQL } from "@lib/queryGraphQL";
import fs from "fs";

queryGraphQL(getEndpointTheGraph("zapaz/eip721-mumbai"), getQueryByName("zapaz/eip721-mumbai", "tokens2uris"))
  .then((json: string): void => {
    // console.log(json);

    const { tokens } = JSON.parse(json) as { tokens: Array<{ id: string; uri: string }> };
    const urisJson = JSON.stringify(tokens, null, 2);
    console.log(urisJson);

    const chainId = 80001;
    const urisDir = `datas/${chainId}`;
    fs.mkdirSync(urisDir, { recursive: true });
    fs.writeFileSync(`${urisDir}/uris.json`, urisJson, "utf8");
  })
  .catch(console.error);
