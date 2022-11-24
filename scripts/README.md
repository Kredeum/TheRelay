# Scripts

_In the following commands, you can replace `pnpm` by `yarn` or by `npm run <command> -- <parameters>`_

## TheRelay

To start TheRelay :

```
pnpm therelay start
```

To stop TheRelay :

```
pnpm therelay stop
```

To get the status of TheRelay :

```
pnpm therelay status
```

### TheQuery

Usage :

```
pnpm thequery [options] <graphName> <queryName> [queryVariables]
```

Query example without TheRelay :

```
pnpm thequery wighawag/eip721-subgraph tokens
```

Query example with TheRelay :

```
pnpm thequery wighawag/eip721-subgraph tokens -r
```

Query examples with options :

```
pnpm thequery wighawag/eip721-subgraph my-tokens --owner-address 0xa6d856e4e9b1d12f42687bcacd691ba48008d6c3 --logs
```

```
pnpm thequery wighawag/eip721-subgraph collection --collection-address 0x00000000001ba87a34f0d3224286643b36646d81 -r
```

_If TheRelay is not running, it will be automatically started then stopped, to execute TheQuery command
To be used in test environment only_

### GraphQL generic utility

Usage :

```
pnpm graphql [options] <endpoint> <queryPath> [queryVariables]
```

Query example :

```
pnpm graphql https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph wighawag/eip721-subgraph/tokens
```

### IPFS generic utility

_To run these command you should have a IPFS server running locally or remotely_

Add to IPFS example :

```
pnpm ipfs add "TheRelay test"
```

Get from IPFS example :

```
pnpm ipfs cat bafybeidg3zkcudh4mvpaevcy3ezdmzsxuel6jgshl4rsu2h35672t3blvm
```
