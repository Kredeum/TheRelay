import { fetchText } from "@lib/fetch/fetchText";
import { IpfsParamsType } from "@lib/types";
import { utilsResolveUrl } from "@lib/utils";

const ipfsCat = async (cid: string, params: IpfsParamsType): Promise<string> => {
  // console.log("ipfsCat", cid, params);

  let url = "";
  ({ url } = utilsResolveUrl(params.ipfsGateway || "", params.ipfsUrl || ""));
  url += `/ipfs/${cid}`;

  const text = await fetchText(url, { method: "GET" }, params.verbose);

  if (params.verbose) console.info("IPFS CAT", cid, text);
  return text;
};

export { ipfsCat };
