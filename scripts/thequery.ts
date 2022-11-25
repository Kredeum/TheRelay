#!/usr/bin/env ts-node

import { Command } from "commander";

import type { OptionsType } from "@lib/types";

import { queryGetByName, queryGetTheGraphEndpoint } from "@lib/query/queryGet";
import { queryGetVariables } from "@lib/query/queryGetVariables";
import { queryTheGraph } from "@lib/query/queryTheGraph";


const main = async () => {
  const program = new Command();

  program
    .name("thequery")
    .description("Query TheGraph, transparent mode or via TheRelay proxy (-r)")
    .argument("<graphName>", "subgraph name")
    .argument("<queryName>", "query name")
    .option("-l , --logs", "display query request", false)
    .option("-r, --therelay", "use local relay, automaticaly launched", false)
    .option("-u, --therelay-url <string>", "use remote relay, on this url", false)
    .option("-o, --owner-address <string>", "filter on this owner address")
    .option("-c, --collection-address <string>", "filter on this collection address")
    .option("-t, --token-id <string>", "filter on this token ID")
    .option("-f, --first <number>", "limit to first results")
    .option("-s, --skip <number>", "skip results")
    .action(async (graphName: string, queryName: string, options: OptionsType) => {

      const endpoint = queryGetTheGraphEndpoint(graphName);
      const query = queryGetByName(graphName, queryName, queryGetVariables(options));

      console.info(await queryTheGraph(endpoint, query, options));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);