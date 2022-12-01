#!/usr/bin/env ts-node

import { Command } from "commander";
import { ipfsCat } from "@lib/ipfs/ipfsCat";
import { ipfsAdd } from "@lib/ipfs/ipfsAdd";
import { ipfsStatus, ipfsVersion } from "@lib/ipfs/ipfs";
import { IpfsParamsType } from "@lib/types";

const main = async () => {
  const program = new Command();

  program
    .description("IPFS commands")
    .option("-v , --verbose", "add traces", false)
    .option("-i, --ipfs-url <string>", "ipfs url", "http://127.0.0.1")
    .option("-a, --ipfs-api <string>", "ipfs api port or full url", "5001")
    .option("-g, --ipfs-gateway <string>", "ipfs gateway port or full url", "8080");

  const options: IpfsParamsType = program.opts();

  program.command("cat")
    .argument("<cid>", "IPFS CID to retreive from IPFS")
    .description("Display IPFS CID")
    .action(async (cid: string) => console.info(await ipfsCat(cid, options)));

  program.command("add")
    .argument("<buffer>", "buffer to add to IPFS")
    .description("Add buffer to IPFS")
    .action(async (buffer: string) => console.info(await ipfsAdd(buffer, options)));

  program.command("version")
    .action(async () => console.info(await ipfsVersion(options)));

  program.command("status")
    .action(async () => console.info(await ipfsStatus(options)));

  await program.parseAsync(process.argv);
};

main().catch(console.error);