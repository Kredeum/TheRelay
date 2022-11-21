#!/usr/bin/env ts-node

import { Command } from "commander";
import { theRelay } from "@lib/theRelay";


const main = async () => {
  const program = new Command();

  program
    .description("Manage TheRelay daemon");

  program
    .command("start")
    .description("Start TheRelay daemon")
    .action(async () => (console.log(await theRelay("start"))));

  program
    .command("stop")
    .description("Stop TheRelay daemon")
    .action(async () => (console.log(await theRelay("stop"))));

  program
    .command("status")
    .description("Get TheRelay Status")
    .action(async () => (console.log(await theRelay("status"))));

  await program.parseAsync(process.argv);
};

main().catch(console.error);