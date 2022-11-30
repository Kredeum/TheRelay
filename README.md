# TheRelay

### Purpose

The objective of TheRelay is to enrich TheGraph NFT queries with metadata

### Problem

Currently NFT subgraph are missing metadata information

This is due, by nature, to the slowness of metadata fetching that can't be done synchronously while blockchain is indexed by TheGraph. Moreover fetching metadata may also fail sometimes, due to centralized storage or to centralized access to decentralized storage, or even invalid json format.

To tackle this problem, work by The Graph Core Development team on « File data sources » is under process.

### Solution

TheRelay enables today the enrichment of NFT subgraphs, in a centralized / hosted way.

TheRelay can only enrich NFTs having ERC721Medata option, i.e. with tokenURI, that is nevertheless most of NFTs, but not all.

TheRelay acts a proxy between your GraphQL query and TheGraph network.

TheRelay stores json metadata on IPFS if an IPFS server is available, either stores it on it's local filesystem.

When "File Data Sources" will be deployed to TheGraph, this will be also possible in a decentralized way.

### Basic example

'wighawag/eip721-subgraph' will be used as the reference subgraph to query

For exemple this query

```
{
  tokens(first: 1, skip: 2000) {
    id
    tokenURI
  }
}
```

sent to TheGraph at this endpoint :

```
https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph
```

returns :

```
{
  "tokens": [
    {
      "id": "0x00000000001ba87a34f0d3224286643b36646d81_2610",
      "tokenURI": "https://dungeonized.com/nfts/2610"
    }
  ]
}

```

You can replay it with `pnpm thequery wighawag/eip721-subgraph token`

Same query sent via TheRelay

```
 http:127.0.0.1:8080/subgraphs/name/wighawag/eip721-subgraph/graphq
```

returns :

```
[
  {
    "id": "0x00000000001ba87a34f0d3224286643b36646d81_2610",
    "tokenURI": "https://dungeonized.com/nfts/2610",
    "metadata": {
      "name": "Dungeonized #2610",
      "image": "https://dungeonized.com/nfts/images/2610.png",
      "description": "Dungeonized is a collection consisting of 3,333 Heroes playable in a web game and inside of BEO. We are a utility based NFT with a plethora of value all delivered on a Free mint. Find out more on our website: https://Dungeonized.com",
      "attributes": [
        {
          "trait_type": "Background",
          "value": "Large Tower"
        },
        {
          "trait_type": "Mouth",
          "value": "No Mouth"
        },
        {
          "trait_type": "Body",
          "value": "Amethyst Purple"
        },
        {
          "trait_type": "Armor",
          "value": "Dark Green Armor"
        },
        {
          "trait_type": "Sword",
          "value": "Falchion Sword"
        },
        {
          "trait_type": "Head",
          "value": "Blue Bandana"
        },
        {
          "trait_type": "Scarf",
          "value": "Purple Scarf"
        },
        {
          "trait_type": "Eyes",
          "value": "Gray Eyes"
        },
        {
          "trait_type": "Pass Type",
          "value": "Regulars"
        }
      ]
    },
    "metadataCid": "bafybeieozp7w3vlhoiwisoi2khyhi7mbwgzdacubrf7p64h22zttmwmvre"
  }
]
```

You can replay it with `pnpm thequery wighawag/eip721-subgraph token --therelay`

### Features

#### Available

- TheRelay : service acting as json proxy retreiving json answers from TheGraph and adding NFT metadata
  - on each NFT query, on each NFT retrieved :
    - NFT metadata read from IPFS (or filesystem) if available
    - else metadata fetched from the tokenURI
    - then saved to filesystem
    - and saved to IPFS if available
  - start/stop/status commands available
  - can be run as a daemon or inside TheQuery client
  - can be run on local desktop or remote server
- TheQuery : cli framework
  - TheGraph NFT queries : with both [wighawag](https://github.com/wighawag/eip721-subgraph/blob/master/schema.graphql) and [amxx](https://github.com/OpenZeppelin/openzeppelin-subgraphs/blob/main/generated/erc721.schema.graphql) NFT schemas
  - TheGraph NFT queries enriched with metadata via TheRelay (for both NFT schemas)
  - Some unstable http://therelay.kredeum.com server
  - GraphQL utility
  - IFPS utility

#### Roadmap

- TheRelay
  - manage fetching / json errors
  - manage inline metadata
  - setup a stable remote server, with https, with IPFS pinning service
  - transform TheRelay from a json relay to a real graphQL relay (then accessible via [GraphiQL](https://github.com/graphql/graphiql/tree/main/packages/graphiql))
- TheQuery
  - full support of ENV parameters
  - develop and run indexing scripts, to be applied on various blockchains to store / pin IPFS
  - target specific position of tokenURI (currently only nfts/uri or nfts/tokenURI in TheGraph results)
  - multi blockchain queries (with also chain identification when only monochain)

### Usage

**Full documentation on [this page](./scripts/README.md)**
