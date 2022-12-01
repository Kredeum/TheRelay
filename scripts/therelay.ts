#!/usr/bin/env ts-node

import { Command } from "commander";
import { theRelayStart, theRelayStatus, theRelayStop } from "@lib/theRelay";
import { TheRelayParamsType, THERELAY_URL_DEFAULT } from "@lib/types";

const main = async () => {
  const program = new Command();

  program
    .name("therelay")
    .option("-v , --verbose", "add traces", false)
    .option("-r, --therelay-url <string>", "therelay url", THERELAY_URL_DEFAULT)
    .option("-n, --no-ipfs", "do not save metadata to IPFS", true)
    .option("-m, --no-save", "do not save metadata to filesystem", true)
    .option("-u, --ipfs-url <string>", "ipfs url", "http://127.0.0.1")
    .option("-i, --ipfs-api <string>", "ipfs api port or full url", "5001")
    .option("-g, --ipfs-gateway <string>", "ipfs gateway port or full url", "8080")
    .description("Manage TheRelay daemon");

  const options: TheRelayParamsType = program.opts();

  program
    .command("start")
    .description("Start TheRelay daemon")
    .action(async () => {
      console.info(await theRelayStart(options));
    });

  program
    .command("stop")
    .description("Stop TheRelay daemon")
    .action(async () => console.info(await theRelayStop()));

  program
    .command("status")
    .description("Get TheRelay Status")
    .action(async () => console.info(await theRelayStatus()));

  await program.parseAsync(process.argv);
};

main().catch(console.error);