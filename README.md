# TheRelay

## 1. Introduction

### Purpose

The objective of TheRelay is to enrich subgraph NFT queries with metadata

### Problem

Currently NFT subgraph are missing metadata information

This is due, by nature, to the slowness of metadata fetching that can't be done synchronously while blockchain is indexed by TheGraph. Moreover fetching metadata may also fail sometimes, due to centralized storage or to centralized access to decentralized storage, or even invalid json format.

To tackle this problem, work by The Graph Core Development team on « File data sources » is under process.

### Solution

TheRelay enables today the enrichment of NFT subgraphs, in a centralized / hosted way.

TheRelay can only enrich NFTs having ERC721Medata option, i.e. with tokenURI, that is nevertheless most of NFTs, but not all.

TheRelay acts a proxy between your GraphQL query and TheGraph network.

When "File Data Sources" will be deployed to TheGraph, this will be also possible in a decentralized way.

### Basic example

'wighawag/eip721-subgraph' will be used as the reference subgraph to query

For exemple this query :

```
{
  tokens(first: 3, skip: 2000) {
    id
    tokenURI
  }
}
```

send to TheGraph https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph
returns :

```
{
  "tokens": [
    {
      "id": "0x00000000001ba87a34f0d3224286643b36646d81_2610",
      "tokenURI": "https://dungeonized.com/nfts/2610"
    },
    {
      "id": "0x00000000001ba87a34f0d3224286643b36646d81_2611",
      "tokenURI": "https://dungeonized.com/nfts/2611"
    },
    {
      "id": "0x00000000001ba87a34f0d3224286643b36646d81_2612",
      "tokenURI": "https://dungeonized.com/nfts/2612"
    }
  ]
}
```

send to TheRelay http:127.0.0.1:8080/subgraphs/name/wighawag/eip721-subgraph/graphq  
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
  },
  {
    "id": "0x00000000001ba87a34f0d3224286643b36646d81_2611",
    "tokenURI": "https://dungeonized.com/nfts/2611",
    "metadata": {
      "name": "Dungeonized #2611",
      "image": "https://dungeonized.com/nfts/images/2611.png",
      "description": "Dungeonized is a collection consisting of 3,333 Heroes playable in a web game and inside of BEO. We are a utility based NFT with a plethora of value all delivered on a Free mint. Find out more on our website: https://Dungeonized.com",
      "attributes": [
        {
          "trait_type": "Background",
          "value": "Construction Zone"
        },
        {
          "trait_type": "Mouth",
          "value": "Grin"
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
          "value": "Purple Bandana"
        },
        {
          "trait_type": "Scarf",
          "value": "Purple Scarf"
        },
        {
          "trait_type": "Eyes",
          "value": "Purple Glasses"
        },
        {
          "trait_type": "Pass Type",
          "value": "Regulars"
        }
      ]
    },
    "metadataCid": "bafybeicyyokewhyig5wtp6smkaxrnxf3lagxul2equ4z4v56iw3xncj3x4"
  },
  {
    "id": "0x00000000001ba87a34f0d3224286643b36646d81_2612",
    "tokenURI": "https://dungeonized.com/nfts/2612",
    "metadata": {
      "name": "Dungeonized #2612",
      "image": "https://dungeonized.com/nfts/images/2612.png",
      "description": "Dungeonized is a collection consisting of 3,333 Heroes playable in a web game and inside of BEO. We are a utility based NFT with a plethora of value all delivered on a Free mint. Find out more on our website: https://Dungeonized.com",
      "attributes": [
        {
          "trait_type": "Background",
          "value": "Radioactive"
        },
        {
          "trait_type": "Mouth",
          "value": "Grin"
        },
        {
          "trait_type": "Body",
          "value": "Bronze"
        },
        {
          "trait_type": "Armor",
          "value": "Gray Armor"
        },
        {
          "trait_type": "Sword",
          "value": "Falchion Sword"
        },
        {
          "trait_type": "Head",
          "value": "Pink Bandana"
        },
        {
          "trait_type": "Scarf",
          "value": "Gray Scarf"
        },
        {
          "trait_type": "Eyes",
          "value": "Purple Eyes"
        },
        {
          "trait_type": "Pass Type",
          "value": "Regulars"
        }
      ]
    },
    "metadataCid": "bafybeigg7t6t3e2rtc3rhziwianhuvuwdy4egxrzi6jrhf7fuki2v4qybq"
  }
]
```

## 2. Install

```
npm install
```

## 3. Run

Scripts are available :

1. to start, stop or get the status of TheRelay dameon
1. to query TheGraph with or without TheRelay

and generic utilities :

1. to query GraphQL endpoints in pure GraphQL
1. to manage IPFS files

Documentation on howto run theses scripts are [available here](./scripts/README.md)
