/* eslint-disable @typescript-eslint/no-misused-promises */
import { queryGraphQL } from "@lib/queryGraphQL";

import express from "express";
import { RELAY_PORT, RELAY_URL, QueryType } from "@lib/common";
import fetch from "node-fetch";
import { addMetadata } from "./addMetadata";

const STATUS_OK = "OK\n";

const app = express();
app.use(express.json());

app.get("/", (req, res) => (res.send("NFT IPFS RELAY")));
app.get("/status", (req, res) => (res.send(STATUS_OK)));

app.post("/query", (req, res) => (res.json(req.body)));
app.post("/", async (req, res): Promise<void> => {
  const { endpointUrl, query } = req.body as QueryType;

  const json = await queryGraphQL(endpointUrl, query);
  res.json(await addMetadata(json));
});

const runTheRelay = async () => {
  try {
    const status = await fetch(`${RELAY_URL}/status`);
    if ((await status.text()) == STATUS_OK) {
      console.log(`TheRelay already listening on ${RELAY_URL}`);
      return;
    }
  } catch (err) { }

  app.listen(RELAY_PORT, () =>
    console.log(`TheRelay listening on ${RELAY_URL}`)
  );
};

export { runTheRelay };