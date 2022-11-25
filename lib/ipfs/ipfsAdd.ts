/* import the ipfs-http-client library */
import { OptionsType } from "@lib/types";
import { create } from "ipfs-http-client";

const ipfsAdd = async (buffer: string, options: OptionsType = {}): Promise<string> => {
  const url = options?.ipfsApiUrl ? new URL(options?.ipfsApiUrl) : { host: "127.0.0.1", port: 5001 };
  // console.log("ipfsAdd ~ url", url);
  // console.log("ipfsAdd ~ options", options);

  const host = options.ipfsHost || url.host;
  const port = Number(options.ipfsApiPort || url.port);
  // console.log(`ipfsAdd { ${host}, ${port} }`);

  const ipfs = create({ host, port });
  const { cid } = await ipfs.add(buffer);

  const cidV1 = String(cid.toV1());
  console.log("IPFS add", cidV1);

  return cidV1;
};

export { ipfsAdd };
