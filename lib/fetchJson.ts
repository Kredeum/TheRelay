import fetch from "node-fetch";

const fetchJson = async (url: string): Promise<string> => {
  console.log(`fetchJson ${url}`);

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

export { fetchJson };
