#!/usr/bin/env ts-node

import { Command } from "commander";
import { queryGetByName, queryGetTheGraphEndpoint } from "@lib/query/queryGet";
import { queryTheGraph } from "@lib/query/queryTheGraph";
import { OptionsType, ParamsType } from "@lib/types";

const main = async () => {
  const program = new Command();

  program
    .name("thequery")
    .description("Query TheGraph, transparent mode or via TheRelay proxy (-r)")
    .argument("<graphName>", "subgraph name")
    .argument("<queryName>", "query name")
    .argument("[queryParams]", "query params")
    .option("-l , --logs", "display query request")
    .option("-r, --therelay", "embedded relay")
    .option("-u, --therelay-url <string>", "remote relay url")
    .option("-c, --collection-address <string>", "collection address")
    .option("-o, --owner-address <string>", "owner address")
    .action(async (graphName: string, queryName: string, queryParams: ParamsType, options: OptionsType) => {
      queryParams ||= {};

      if (options.collectionAddress)
        queryParams.collectionAddress = String(options.collectionAddress).toLowerCase();

      if (options.ownerAddress)
        console.log(".action ~ options.ownerAddress", options.ownerAddress);
      queryParams.ownerAddress = String(options.ownerAddress).toLowerCase();

      const endpoint = queryGetTheGraphEndpoint(graphName);
      const query = queryGetByName(graphName, queryName, queryParams);

      console.info(await queryTheGraph(endpoint, query, options));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);