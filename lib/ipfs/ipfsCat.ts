import { fetchText } from "@lib/fetch/fetchText";
import { OptionsType } from "@lib/types";

const ipfsCat = async (cid: string, options?: OptionsType): Promise<string> => {
  const host = `${options?.ipfsHost || "127.0.0.1"}`;
  const url = `${options?.ipfsGatewayUrl || `http://${host}:${options?.ipfsGatewayPort || "8080"}`}/ipfs/${cid}`;
  console.log("ipfsCat url", url);

  return await fetchText(url);
};

export { ipfsCat };