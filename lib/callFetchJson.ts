import fetch from "node-fetch";

const callFetchJson = async (url: string): Promise<string> => {
  console.log(`callFetchJson ${url}`);

  let json = "{}";
  const config = { method: "GET" };

  try {
    const res = await fetch(url, config);

    json = (await res.json()) as string;
  } catch (e) {
    console.error("fetchJson fetch ERROR", e);
  }

  console.log(json);
  return json;
};

export { callFetchJson };
