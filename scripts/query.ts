#!/usr/bin/env ts-node

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Command } from "commander";
import { theRelay } from "@lib/theRelay";
import { queryGetByName, queryGetByPath, queryGetTheGraphEndpoint } from "@lib/query/queryGet";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { queryTheGraph } from "@lib/query/queryTheGraph";



const main = async () => {
  const program = new Command();

  program
    .name("query")
    .description("Query TheGraph with TheRelay")
    .version("0.0.3");

  program
    .command("relay")
    .argument("[cmd]", "start stop status")
    .description("Launch TheRelay")
    .action(async (cmd) => (console.log(await theRelay(cmd))));

  program
    .command("graphql")
    .description("Query Graphql, query whatever GraphQL service")
    .argument("<endpoint>", "endpoint url")
    .argument("<queryPath>", "query path")
    .argument("[queryParams]", "query params")
    .action(async (endpoint, queryPath, queryParams) => {
      console.log(await queryGraphQL(endpoint, queryGetByPath(queryPath, queryParams)));
    });

  program
    .command("thegraph")
    .description("Query TheGraph, transparent mode or via TheRelay proxy (-r)")
    .argument("<graphName>", "subgraph name")
    .argument("<queryName>", "query name")
    .argument("[queryParams]", "query params")
    .option("-l , --logs", "display query request")
    .option("-r, --relay", "embedded relay")
    .option("-u, --relayUrl <string>", "remote relay url")
    .option("-c, --collection-address <string>", "collection address")
    .action(async (graphName, queryName, queryParams, options) => {
      queryParams = JSON.parse(queryParams || "{}");

      const endpoint = queryGetTheGraphEndpoint(graphName);
      const query = queryGetByName(graphName, queryName, queryParams);
      if (options.collectionAddress) {
        queryParams.collectionAddress = String(options.collectionAddress).toLowerCase();
      }

      console.log(await queryTheGraph(endpoint, query, options));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);