import { theRelayStart, theRelayStop } from "@lib/theRelay";
import { queryGetByName, queryTheGraph, queryTheRelay } from "@lib/query/query";

const subgraphName = "wighawag/eip721-subgraph";
const endpoint = `https://api.thegraph.com/subgraphs/name/${subgraphName}`;

const main = async () => {
  // Get basic token query
  const queryToken = queryGetByName(subgraphName, "token");

  // Query TheGraph directly
  console.log("TheGraph", await queryTheGraph(endpoint, queryToken));

  {
    // Start TheRelay locally
    await theRelayStart();

    // Query TheGraph via TheRelay
    console.log("TheRelay", await queryTheRelay(endpoint, queryToken));

    // Stop TheRelay
    await theRelayStop();
  }
};

main().catch(console.error);
