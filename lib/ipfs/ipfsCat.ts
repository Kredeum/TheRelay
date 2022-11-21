import { fetchText } from "@lib/fetch/fetchText";
import { OptionsType } from "@lib/types";

const ipfsCat = async (cid: string, options?: OptionsType): Promise<string> => {
  const url = `${options?.ipfsUrl || "http://127.0.0.1:8081/ipfs"}/${cid}`;

  return await fetchText(url);
};

export { ipfsCat };