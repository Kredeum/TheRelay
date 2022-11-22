/* import the ipfs-http-client library */
import { OptionsType } from "@lib/types";
import { create } from "ipfs-http-client";

const ipfsAdd = async (buffer: string, options: OptionsType = {}): Promise<string> => {
  const url = options?.ipfsApiurl ? new URL(options?.ipfsApiurl) : { host: "127.0.0.1", port: 5001 };

  const host = options.ipfsHost || url.host;
  const port = Number(options.ipfsApiPort || url.port);
  console.log("ipfsAdd { host, port }", host, port);

  const ipfs = create({ host, port });
  const { cid } = await ipfs.add(buffer);

  return String(cid.toV1());
};

export { ipfsAdd };
