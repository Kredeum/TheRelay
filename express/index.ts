import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { remoteGraphQL } from "./remote";

import dotenv from "dotenv";
import findupSync from "findup-sync";

if (!process.env.PUBKEY) {
  dotenv.config({ path: findupSync(".env") || "" });
  if (!process.env.PUBKEY) {
    throw new Error("HARDHAT : ENV variable PUBKEY not set!");
  }
}
const PUBKEY = process.env.PUBKEY.toLowerCase();

const PORT = 4000;
const app = express();
// const URL = "https://api.publicapis.org";

const ENDPOINT = "https://api.thegraph.com/subgraphs/name/amxx/nft-matic";
const QUERY = `{
  account(id: "${PUBKEY}") {
    ERC721tokens(first: 9) {
      uri
    }
    ERC1155balances(first: 9) {
      token{
        uri
      }
    }
  }
}`;
console.log("QUERY", QUERY);

type InputType = {
  data: {
    account: {
      ERC721tokens: UriType;
      ERC1155balances: UriBalType;
    };
  };
};
type UriType = Array<{
  uri: string;
}>;
type UriBalType = Array<{
  token: { uri: string };
}>;
type OutputType = Array<string>;

const transform = (input: UriType): OutputType => input.map((item) => item.uri);

app.use("/api", async (req, res) => {
  const input: string = await remoteGraphQL(ENDPOINT, QUERY);
  const { account } = (JSON.parse(input) as InputType).data;
  const out721 = account.ERC721tokens.map((tok) => tok.uri);
  const out1155 = account.ERC1155balances.map((tok) => tok.token.uri);

  const out = [...new Set([...out721, ...out1155])];
  res.send(JSON.stringify(out, null, " "));
});

app.use("/hi", (req, res) => {
  res.send("Bonjour!");
});

app.use(
  "/graphiql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${4000}`);
});
