import { fetchText } from "@lib/fetch/fetchText";

const ipfsCat = async (cid: string): Promise<string> => {
  const url = `http://127.0.0.1:8081/ipfs/${cid}`;

  return await fetchText(url);
};

export { ipfsCat };