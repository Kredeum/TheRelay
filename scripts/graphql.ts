#!/usr/bin/env ts-node

import { Command } from "commander";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { QueryParamsType } from "@lib/types";
import { queryGetByPath } from "@lib/query/queryGet";

const main = async () => {
  const program = new Command();

  program
    .name("graphql")
    .description("Query Graphql, query whatever GraphQL service")
    .argument("<endpoint>", "endpoint url")
    .argument("<queryPath>", "query path")
    .argument("[queryParams]", "query params")
    .action(async (endpoint: string, queryPath: string, queryParams: QueryParamsType) => {
      console.info(await queryGraphQL(endpoint, queryGetByPath(queryPath, queryParams)));
    });

  await program.parseAsync(process.argv);
};

main().catch(console.error);