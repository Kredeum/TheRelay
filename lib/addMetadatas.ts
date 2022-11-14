import { fetchJson } from "@lib/fetchJson";
import { saveMetadata } from "@lib/saveMetadata";
import { readMetadata } from "./readMetadata";

type TokenType = { id: string; uri: string; metadata?: unknown; }


const addMetadata = async (token: TokenType, chainId = 1): Promise<void> => {
  const res = token.id.split(/_|\//);
  if (res.length != 2) throw `Bad token id ${token.id}`;
  const [address, tokenID] = res;

  const savedMetadata: unknown = readMetadata(address, tokenID, chainId);
  if (savedMetadata == "") {
    token.metadata = await fetchJson(token.uri);
    saveMetadata(token.metadata, address, tokenID, chainId);
  } else {
    token.metadata = savedMetadata;
  }
};

const addMetadatas = async (tokens: Array<TokenType>, chainId = 0): Promise<void> => {
  for (const token of tokens) await addMetadata(token, chainId);
};

export type { TokenType };
export { addMetadatas, addMetadata };