/* import the ipfs-http-client library */
import { IPFS_RUNNING, IPFS_STOPPED, IpfsParamsType } from "@lib/types";
import { utilsResolveUrl } from "@lib/utils";
import { create, IPFSHTTPClient } from "ipfs-http-client";

const ipfsNew = async (params: IpfsParamsType): Promise<IPFSHTTPClient | null> => {
  // console.log("IPFS NEW", params);

  const { host, port } = utilsResolveUrl(params.ipfsApi || "", params.ipfsUrl || "");

  let ipfs: IPFSHTTPClient | null = null;
  try {
    ipfs = create({ host, port });
    await ipfs.version();
  }
  catch (err) {
    // console.log("ipfsNew ~ err", err);
    ipfs = null;
  }
  return ipfs;
};

const ipfsVersion = async (params: IpfsParamsType): Promise<string> => {
  const ipfs = await ipfsNew(params);

  return ipfs ? (await ipfs.version()).version : "";
};

const ipfsStatus = async (params: IpfsParamsType): Promise<string> => {
  return await ipfsNew(params) ? IPFS_RUNNING : IPFS_STOPPED;
};

export { ipfsNew, ipfsVersion, ipfsStatus };
