/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";

const ipfsAdd = async (buffer: string): Promise<string> => {
  const ipfs = create({ host: "127.0.0.1" });
  const { cid } = await ipfs.add(buffer);

  return String(cid.toV1());
};

export { ipfsAdd };
