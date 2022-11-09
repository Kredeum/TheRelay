const getEndpointTheGraph = (graphName: string): string =>
  `https://api.thegraph.com/subgraphs/name/${graphName}`;

export { getEndpointTheGraph };
