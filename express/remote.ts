import fetch from "node-fetch";

async function remoteGraphQL(url: string, query: string): Promise<string> {
  console.log(`${query}\n${url}`);

  const config = { method: "POST", body: JSON.stringify({ query: query }) };
  const result = await (await fetch(url, config)).text();

  console.log(JSON.stringify(JSON.parse(result), null, "  "));
  return result;
}

export { remoteGraphQL };
