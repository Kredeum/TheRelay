# Scripts

Different scripts are available :

1. **TheRelay script** : to start, stop or get the status of TheRelay dameon
1. **TheQuery script** : to query TheGraph with or without TheRelay

and generic utilities :

1. IPFS script : to manage IPFS files
1. GraphQL script : to query GraphQL endpoints in pure GraphQL

## Prerequisites

- [node](https://nodejs.org/en/download/) v16 or v18 installed
- [IPFS service with pinning available](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-an-existing-pinning-service) , for tests you can simply use [IPFS desktop](https://docs.ipfs.tech/install/ipfs-desktop/)

- [pnpm](https://pnpm.io/installation) recommanded

## Installation

```shell
pnpm install
```

## TheRelay

TheRelay is a service that can be run as a daemon on your local machine or on a remote server

```text
Usage: pnpm therelay [options] [command]

Manage TheRelay daemon

Options:
  -v , --verbose               add traces (default: false)
  -r, --therelay-url <string>  therelay url (default: "http://127.0.0.1:4004")
  -n, --no-ipfs                do not save metadata to IPFS
  -m, --no-save                do not save metadata to filesystem
  -u, --ipfs-url <string>      ipfs url (default: "http://127.0.0.1")
  -i, --ipfs-api <string>      ipfs api port or full url (default: "5001")
  -g, --ipfs-gateway <string>  ipfs gateway port or full url (default: "8080")
  -h, --help                   display help for command

Commands:
  start                        Start TheRelay daemon
  stop                         Stop TheRelay daemon
  status                       Get TheRelay Status
  help [command]               display help for command
```

_TheRelay can also be automatically launched on your local machine on each query, in this case you will not need these commands_

### TheQuery

TheQuery is the cli utility, that can query TheGraph directly or via TheRelay

TheQuery use pre-defined queries, located in `queries` directory

Metadata retreived by the TheRelay is stored on IPFS, and in case IPFS is not available, also stores metadata on the local filesystem of TheRelay machine in `datas` directory

```text
Usage: pnpm thequery [options] <graphName> <queryName>

Query TheGraph, transparent mode or via TheRelay proxy (-r)

Arguments:
  graphName                          subgraph name
  queryName                          query name

Options:
  -v , --verbose                     add traces (default: false)
  -r, --therelay                     use local relay, automaticaly launched (default: false)
  -u, --therelay-url <string>        points to relay url (default: "http://127.0.0.1:4004")
  -o, --owner-address <string>       owner address
  -n, --chain-id <string>            network chainId
  -c, --collection-address <string>  collection address
  -t, --token-id <string>            token ID
  -f, --first <number>               limit to first results
  -s, --skip <number>                skip results
  -h, --help                         display help for command
```

Query example (without TheRelay) :

```shell
pnpm thequery wighawag/eip721-subgraph tokens
```

Query example with TheRelay :

```shell
pnpm thequery wighawag/eip721-subgraph tokens -r
```

_TheRelay url can be specified with THERELAY_URL environnment variable or via the cli parameter (-u or --therelay-url)
Default local relay is http://127.0.0.1:4004 (launched for the time of the query if not already running as a daemon)_

Query examples with parameters :

```shell
pnpm thequery wighawag/eip721-subgraph my-tokens --owner-address 0xa6d856e4e9b1d12f42687bcacd691ba48008d6c3 --verbose
```

```shell
pnpm thequery wighawag/eip721-subgraph collection --collection-address 0x00000000001ba87a34f0d3224286643b36646d81 -r
```

### IPFS generic utility

_To run IFPS command you should have a IPFS server running locally or remotely_

```text
Usage: pnpm ipfs [options] [command]

IPFS commands

Options:
  -v , --verbose               add traces (default: false)
  -i, --ipfs-url <string>      ipfs url (default: "http://127.0.0.1")
  -a, --ipfs-api <string>      ipfs api port or full url (default: "5001")
  -g, --ipfs-gateway <string>  ipfs gateway port or full url (default: "8080")
  -h, --help                   display help for command

Commands:
  cat <cid>                    Display IPFS CID
  add <buffer>                 Add buffer to IPFS
  version
  status
  help [command]               display help for command
```

Add to IPFS example :

```shell
pnpm ipfs add "TheRelay test"
```

Get from IPFS example :

```shell
pnpm ipfs cat bafybeidg3zkcudh4mvpaevcy3ezdmzsxuel6jgshl4rsu2h35672t3blvm
```

### GraphQL generic utility

```text
Usage: pnpm graphql [options] <endpoint> <queryPath> [queryParams]

Query Graphql, query whatever GraphQL service

Arguments:
  endpoint     endpoint url
  queryPath    query path
  queryParams  query params

Options:
  -h, --help   display help for command
```

Query example :

```shell
pnpm graphql https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph wighawag/eip721-subgraph/tokens
```
