#!/usr/bin/env ts-node

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Command } from "commander";
import { runTheRelay } from "@lib/theRelay";
import { getQueryByName, getQueryByPath } from "@lib/getQuery";
import { getEndpointTheGraph } from "@lib/getEndpoint";
import { queryGraphQL } from "@lib/queryGraphQL";
import { queryTheRelay } from "@lib/queryTheRelay";

const main = async () => {
  const program = new Command();

  program
    .name("query")
    .description("Query TheRelay, TheGraph or GraphQL")
    .version("0.0.1");

  program
    .command("relay")
    .description("Launch TheRelay")
    .action(runTheRelay);

  program
    .command("graphql")
    .description("Query Graphql, query whatever GraphQL service")
    .argument("<endpointUrl>", "endpoint url")
    .argument("<queryPath>", "query path")
    .argument("[queryParams]", "query params")
    .action(async (endpointUrl, queryPath, queryParams) => {
      console.log(await queryGraphQL(endpointUrl, getQueryByPath(queryPath, queryParams)));
    });

  program
    .command("thegraph")
    .description("Query TheGraph, transparent mode or via TheRelay proxy (-r)")
    .argument("<graphName>", "subgraph name")
    .argument("<queryName>", "query name")
    .argument("[queryParams]", "query params")
    .option("-r, --relay", "with proxy relay")
    .option("-c, --collection-address", "collection address")
    .action(async (graphName, queryName, queryParams, options) => {
      const query = getQueryByName(graphName, queryName, queryParams);
      if (options.relay) {
        await runTheRelay();
        console.log(await queryTheRelay(graphName, query));
      } else {
        console.log(await queryGraphQL(getEndpointTheGraph(graphName), query));
      }
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);