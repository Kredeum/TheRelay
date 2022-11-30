/* import the ipfs-http-client library */
import { IPFS_RUNNING, IPFS_STOPPED, OptionsType } from "@lib/types";
import { create, IPFSHTTPClient } from "ipfs-http-client";

const ipfsNew = async (options: OptionsType = {}): Promise<IPFSHTTPClient | null> => {
  const url = options?.ipfsApiUrl ? new URL(options?.ipfsApiUrl) : { host: "127.0.0.1", port: 5001 };
  const host = options.ipfsHost || url.host;
  const port = Number(options.ipfsApiPort || url.port);
  // console.log(`ipfsAdd { ${host}, ${port} }`);

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

const ipfsVersion = async (options: OptionsType = {}): Promise<string> => {
  const ipfs = await ipfsNew(options);

  return ipfs ? (await ipfs.version()).version : "";
};


const ipfsStatus = async (options: OptionsType = {}): Promise<string> => {
  return await ipfsNew(options) ? IPFS_RUNNING : IPFS_STOPPED;
};

export { ipfsNew, ipfsVersion, ipfsStatus };
