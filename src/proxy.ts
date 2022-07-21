import fetch from "node-fetch";

type FetchResponse = {
  data?: string;
  error?: string;
};

const URL = "https://api.thegraph.com/subgraphs/name/tranchien2002/eip721-matic";
const QUERY = `{
  alls
  {
    numTokens
  }
}`;

async function remoteGraphQL(query: string = QUERY, url: string = URL): Promise<string> {
  console.log(`${query}\n${url}`);

  let json: FetchResponse = {};
  const config = { method: "POST", body: JSON.stringify({ query: query }) };

  try {
    const res = await fetch(url, config);
    // console.log(res);
    json = (await res.json()) as FetchResponse;
    // console.log("graphQL ~ json", json);
  } catch (e) {
    const err = `graphQL fetch ERROR ${e}`;
    console.error(err);
    return err;
  }
  if (json.error) {
    const err = `graphQL json ERROR ${json.error}`;
    console.error(err);
    return err;
  }

  // console.log(json);
  return json.data || "";
}

remoteGraphQL().then((res) => {
  console.log(JSON.stringify(res, null, "  "));
});

export { remoteGraphQL };
