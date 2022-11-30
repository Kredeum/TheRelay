#!/usr/bin/env ts-node

import { Command } from "commander";
import { ipfsCat } from "@lib/ipfs/ipfsCat";
import { ipfsAdd } from "@lib/ipfs/ipfsAdd";
import { OptionsType } from "@lib/types";
import { ipfsStatus, ipfsVersion } from "@lib/ipfs/ipfs";

const main = async () => {
  const program = new Command();

  program
    .description("IPFS commands");

  program.command("cat")
    .argument("<cid>", "IPFS CID to retreive from IPFS")
    .description("Display IPFS CID")
    .option("-h, --ipfs-host <string>", "ipfs host, default 127.0.0.1")
    .option("-p, --ipfs-gateway-port <string>", "ipfs gateway port, default 8080")
    .option("-u, --ipfs-gateway-url <string>", "ipfs gateway url, default http://127.0.0.1:8080")
    .action(async (cid: string, options: OptionsType) => (console.log(await ipfsCat(cid, options))));

  program.command("add")
    .argument("<buffer>", "buffer to add to IPFS")
    .description("Add buffer to IPFS")
    .option("-h, --ipfs-host <string>", "ipfs host, default 127.0.0.1")
    .option("-p, --ipfs-api-port <string>", "ipfs api port, default 5001")
    .option("-u, --ipfs-api-url <string>", "ipfs api url, default http://127.0.0.1:5001")
    .action(async (buffer: string, options: OptionsType) => (console.log(await ipfsAdd(buffer, options))));


  program.command("version")
    .option("-u, --ipfs-api-url <string>", "ipfs api url, default http://127.0.0.1:5001")
    .action(async (buffer: string, options: OptionsType) => (console.log(await ipfsVersion(options))));

  program.command("status")
    .option("-u, --ipfs-api-url <string>", "ipfs api url, default http://127.0.0.1:5001")
    .action(async (buffer: string, options: OptionsType) => (console.log(await ipfsStatus(options))));


  await program.parseAsync(process.argv);
};

main().catch(console.error);