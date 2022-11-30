import { OptionsType } from "@lib/types";
import { ipfsNew } from "./ipfs";

const ipfsAdd = async (buffer: string, options: OptionsType = {}): Promise<string> => {
  const ipfs = await ipfsNew(options);
  if (!ipfs) {
    console.error("IPFS ADD ERROR : no IPFS service found", options);
    return "";
  }

  const { cid } = await ipfs.add(buffer);

  const cidV1 = String(cid.toV1());
  console.info("IPFS ADD", cidV1);

  return cidV1;
};

export { ipfsAdd };
