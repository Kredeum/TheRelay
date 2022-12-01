#!/usr/bin/env ts-node

import { Command } from "commander";

import { TheQueryParamsType } from "@lib/types";
import { metadataGetCid } from "@lib/metadata/metadataGet";

const main = async () => {
  const program = new Command();

  program
    .name("thenfts")
    .argument("<collectionAddress>", "collection address")
    .argument("[tokenId]", "token ID", "1")
    .argument("[chainId]", "chain ID", "0")
    .option("-v , --verbose", "add traces", false)
    .action((collectionAddress: string, tokenId: string, chainId: string) => {
      console.info(metadataGetCid(collectionAddress, tokenId, Number(chainId)));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);