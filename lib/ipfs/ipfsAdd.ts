import { IpfsParamsType } from "@lib/types";
import { ipfsNew } from "./ipfs";

const ipfsAdd = async (buffer: string, params: IpfsParamsType): Promise<string> => {
  // console.log("ipfsAdd ~ params", params);
  if (!params.ipfs) return "";

  const ipfs = await ipfsNew(params);
  if (!ipfs) {
    console.error("IPFS ADD ERROR : no IPFS service found", params);
    return "";
  }

  const { cid } = await ipfs.add(buffer);

  const cidV1 = String(cid.toV1());
  console.info("IPFS ADD", cidV1);

  return cidV1;
};

export { ipfsAdd };
