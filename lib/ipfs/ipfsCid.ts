import { CID } from "multiformats/cid";
import * as raw from "multiformats/codecs/raw";
import { sha256 } from "multiformats/hashes/sha2";

const ipfsCid = async (buffer: string): Promise<string> =>
  CID.create(1, raw.code, await sha256.digest(new TextEncoder().encode(buffer))).toString();

export { ipfsCid };
