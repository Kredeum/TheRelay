import { queryGraphQL, queryGraphQLResponse } from "@lib/query/queryGraphQL";
import { queryGetVariables } from "@lib/query/queryGetVariables";
import {
  queryGetPreprocessed, queryGetByFile, queryGetByPath, queryGetByName,
  queryGetTheGraphEndpoint, queryGetSubgraphDescription
} from "@lib/query/queryGet";

import { queryTheRelay } from "@lib/query/queryTheRelay";

const queryTheGraph = queryGraphQL;

export {
  queryGetPreprocessed, queryGetByFile, queryGetByPath, queryGetByName,
  queryGetTheGraphEndpoint, queryGetSubgraphDescription, queryGetVariables,
  queryTheGraph, queryTheRelay, queryGraphQL, queryGraphQLResponse
};
