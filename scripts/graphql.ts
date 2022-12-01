#!/usr/bin/env ts-node

import { Command } from "commander";
import { queryGraphQL, queryGetByPath } from "@lib/query/query";
import { TheQueryParamsType } from "@lib/types";

const main = async () => {
  const program = new Command();

  program
    .name("graphql")
    .description("Query Graphql, query whatever GraphQL service")
    .argument("<endpoint>", "endpoint url")
    .argument("<queryPath>", "query path")
    .argument("[queryParams]", "query params")
    .action(async (endpoint: string, queryPath: string, queryParams: TheQueryParamsType) => {
      console.info(await queryGraphQL(endpoint, queryGetByPath(queryPath, queryParams)));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);