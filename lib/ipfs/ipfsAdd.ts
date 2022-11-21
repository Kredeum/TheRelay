/* import the ipfs-http-client library */
import { OptionsType } from "@lib/types";
import { create } from "ipfs-http-client";

const ipfsAdd = async (buffer: string, options?: OptionsType): Promise<string> => {
  let host = "127.0.0.1";
  let port = 5001;

  if (options?.ipfsUrl) {
    const url = new URL(options?.ipfsUrl);
    host = url.host;
    port = Number(url.port);
  }


  const ipfs = create({ host, port });
  const { cid } = await ipfs.add(buffer);

  return String(cid.toV1());
};

export { ipfsAdd };
