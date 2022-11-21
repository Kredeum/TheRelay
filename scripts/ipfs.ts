#!/usr/bin/env ts-node

import { Command } from "commander";
import { ipfsCat } from "@lib/ipfs/ipfsCat";
import { ipfsAdd } from "@lib/ipfs/ipfsAdd";
import { OptionsType } from "@lib/types";

const main = async () => {
  const program = new Command();

  program
    .description("IPFS commands");

  program.command("cat")
    .argument("<cid>", "IPFS CID to retreive from IPFS")
    .description("Display IPFS CID")
    .option("-a, --ipfs-api <string>", "ipfs url, default http://127.0.0.1:8081/ipfs")
    .action(async (cid: string, options: OptionsType) => (console.log(await ipfsCat(cid, options))));

  program.command("add")
    .argument("<buffer>", "buffer to add to IPFS")
    .description("Add buffer to IPFS")
    .option("-g, --ipfs-gateway-url <string>", "ipfs url, default http://127.0.0.1:5001")
    .action(async (buffer: string, options: OptionsType) => (console.log(await ipfsAdd(buffer, options))));

  await program.parseAsync(process.argv);
};

main().catch(console.error);