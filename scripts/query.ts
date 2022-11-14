#!/usr/bin/env ts-node

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Command } from "commander";
import { theRelay } from "@lib/theRelay";
import { getQueryByName, getQueryByPath } from "@lib/getQuery";
import { getEndpointTheGraph } from "@lib/getEndpoint";
import { queryGraphQL } from "@lib/queryGraphQL";
import { queryTheRelay } from "@lib/queryTheRelay";



const main = async () => {
  const program = new Command();

  program
    .name("query")
    .description("Query TheRelay, TheGraph or GraphQL")
    .version("0.0.2");

  program
    .command("relay")
    .argument("[cmd]", "start stop status")
    .description("Launch TheRelay")
    .action(async (cmd) => (console.log(await theRelay(cmd))));

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
    .option("-l , --logs", "display query request")
    .option("-r, --relay", "with proxy relay")
    .option("-c, --collection-address <string>", "collection address")
    .action(async (graphName, queryName, queryParams, options) => {
      queryParams = JSON.parse(queryParams || "{}");
      if (options.collectionAddress) {
        queryParams.collectionAddress = String(options.collectionAddress).toLowerCase();
      }

      const query = getQueryByName(graphName, queryName, queryParams);

      if (options.relay) {
        await theRelay("start");

        console.log(await queryTheRelay(graphName, query, options));

        await theRelay("stop");
      } else {
        console.log(await queryGraphQL(getEndpointTheGraph(graphName), query, options));
      }
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);