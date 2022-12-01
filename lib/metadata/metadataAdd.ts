import { fetchJson } from "@lib/fetch/fetchJson";
import { metadataSave } from "@lib/metadata/metadataSave";
import { metadataGet } from "@lib/metadata/metadataGet";
import { theRelayParams } from "@lib/theRelay";

type TokenType = { id: string; tokenURI: string; metadata?: unknown; metadataCid?: string }


const metadataAdd = async (token: TokenType, chainId = 1): Promise<void> => {

  // Match id : 0x001c3c3cc1a2147a610033dd658003a2db6ad0a3/1710
  // Match id : 0x001c3c3cc1a2147a610033dd658003a2db6ad0a3_1710
  const res1 = token.id.match(/^(0x[0-9a-f]{40})(\/|_)([0-9]*)$/);

  // Match id : eip155:5/erc721:0x001c3c3cc1a2147a610033dd658003a2db6ad0a3/1
  const res2 = token.id.match(/^eip155:([0-9]*)\/erc721:(0x[0-9a-f]{40})\/([0-9]*)$/);

  let address: string;
  let tokenID: string;
  let chainID = "0";

  if (res1?.length == 4) [, address, , tokenID] = res1;
  else if (res2?.length == 4) [, chainID, address, tokenID] = res2;
  else return;
  if (Number(chainID) > 0) chainId = Number(chainID);


  const savedMetadata: unknown = await metadataGet(chainId, address, tokenID);

  if (savedMetadata == "") {
    const uri = token.tokenURI.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
    token.metadata = await fetchJson(uri);
    token.metadataCid = await metadataSave(token.metadata, address, tokenID, chainId);

    console.log("METADATA ADD", chainId, address, tokenID);
    if (theRelayParams.verbose) console.log(token.metadata);
  } else {
    token.metadata = savedMetadata;
  }
};

const metadataAdds = async (tokens: Array<TokenType> = [], chainId = 0): Promise<void> => {
  for (const token of tokens) await metadataAdd(token, chainId);
};

export type { TokenType };
export { metadataAdds, metadataAdd };