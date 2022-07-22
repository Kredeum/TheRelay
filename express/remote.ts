import fetch from "node-fetch";

const URL = "https://api.thegraph.com/subgraphs/name/tranchien2002/eip721-matic";
const QUERY = `{
  alls
  {
    numTokens
  }
}`;

async function remoteGraphQL(query: string = QUERY, url: string = URL): Promise<string> {
  console.log(`${query}\n${url}`);

  const config = { method: "POST", body: JSON.stringify({ query: query }) };
  const result = await (await fetch(url, config)).text();

  console.log(JSON.stringify(JSON.parse(result), null, "  "));
  return result;
}

export { remoteGraphQL };
