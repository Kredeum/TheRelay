import fetch from "node-fetch";

type CallGraphQLResponse = {
  data?: unknown;
  errors?: string;
};

const callGraphQL = async (url: string, query: string): Promise<CallGraphQLResponse> => {
  console.info(`callGraphQL\n${url}\n${query}`);

  let json: CallGraphQLResponse = {};
  const config = { method: "POST", body: JSON.stringify({ query: query }) };

  try {
    const res = await fetch(url, config);
    // console.log("callGraphQL", res);

    json = (await res.json()) as CallGraphQLResponse;
    // console.log("callGraphQL", json);
  } catch (e) {
    console.error("callGraphQL fetch ERROR", e);
  }

  // console.log(json);
  return json;
};

export { callGraphQL };
export type { CallGraphQLResponse };
