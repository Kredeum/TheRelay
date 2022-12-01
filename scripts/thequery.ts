#!/usr/bin/env ts-node

import { Command } from "commander";

import { TheQueryParamsType, THERELAY_URL_DEFAULT } from "@lib/types";

import { queryGetByName, queryGetTheGraphEndpoint } from "@lib/query/queryGet";
import { queryTheGraph } from "@lib/query/queryTheGraph";

const main = async () => {
  const program = new Command();


  program
    .name("thequery")
    .description("Query TheGraph, transparent mode or via TheRelay proxy (-r)")
    .argument("<graphName>", "subgraph name")
    .argument("<queryName>", "query name")
    .option("-v , --verbose", "add traces", false)
    .option("-r, --therelay", "use local relay, automaticaly launched", false)
    .option("-u, --therelay-url <string>", "points to relay url", THERELAY_URL_DEFAULT)
    .option("-o, --owner-address <string>", "owner address")
    .option("-n, --chain-id <string>", "network chainId")
    .option("-c, --collection-address <string>", "collection address")
    .option("-t, --token-id <string>", "token ID")
    .option("-f, --first <number>", "limit to first results")
    .option("-s, --skip <number>", "skip results")
    .action(async (graphName: string, queryName: string, options: TheQueryParamsType) => {

      const endpoint = queryGetTheGraphEndpoint(graphName);
      const query = queryGetByName(graphName, queryName);

      console.info(await queryTheGraph(endpoint, query, options));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);