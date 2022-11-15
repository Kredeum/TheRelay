/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Response } from "node-fetch";

import express from "express";
import {
  THERELAY_PORT, THERELAY_URL, THERELAY_RUNNING, THERELAY_STOPPING,
  THERELAY_STOPPED, THERELAY_STARTING
} from "@lib/types";
import fetch from "node-fetch";
import morgan from "morgan";

import { IncomingMessage, Server, ServerResponse } from "http";
import { queryGraphQL } from "./query/queryGraphQL";
import { addMetadata, addMetadatas, TokenType } from "./metadata/metadataAdd";


let server: Server<typeof IncomingMessage, typeof ServerResponse>;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/info", (req, res) => (res.send("NFT IPFS RELAY")));
app.get("/status", (req, res) => (res.send(THERELAY_RUNNING)));
app.post("/query", (req, res) => (res.json(req.body)));

app.get("/stop", (req, res) => {
  res.send(THERELAY_STOPPING);
  server.close();
});

app.post("*", async (req, res): Promise<void> => {
  // console.log("app.post", req.body);

  const { query } = req.body as { query: string };
  if (!query) { res.json("no query"); return; }

  const endpoint = req.path.slice(1);
  if (!endpoint) { res.json("no endpoint"); return; }
  console.log(`TheRelay ${endpoint}\n${query}`);

  const json = await queryGraphQL(endpoint, query);

  const { tokens } = JSON.parse(json) as { tokens: Array<TokenType> };

  await addMetadatas(tokens);

  res.json(JSON.stringify(tokens, null, "  "));
});


const theRelayStatus = async (): Promise<string> => {
  let message = "";

  try {
    const resp: Response = await fetch(`${THERELAY_URL}/status`);
    message = await resp.text();
  } catch (err) { message = THERELAY_STOPPED; }

  // console.log("theRelayStatus", message);
  return message;
};

const theRelayStop = async (): Promise<string> => {
  let message = "";

  if (await theRelayStatus() == THERELAY_STOPPED) {
    message = `ALREADY ${THERELAY_STOPPED}`;
  } else {
    const resp: Response = await fetch(`${THERELAY_URL}/stop`);
    message = await resp.text();
  }

  return message;
};

const theRelayStart = async (): Promise<string> => {
  let message = "";

  if (await theRelayStatus() == THERELAY_RUNNING) {
    message = `ALREADY ${THERELAY_RUNNING}`;
  } else {
    message = THERELAY_STARTING;
    server = app.listen(THERELAY_PORT, () => {
      console.log(`TheRelay listening on ${THERELAY_URL}`);
    });
  }

  return message;
};

const theRelay = async (cmd: string): Promise<string> => {
  return ((cmd == "stop") ? await theRelayStop() :
    ((cmd == "status") ? await theRelayStatus() :
      await theRelayStart()));
};

export { theRelay };