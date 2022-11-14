/* eslint-disable @typescript-eslint/no-misused-promises */
import { queryGraphQL } from "@lib/queryGraphQL";
import type { Response } from "node-fetch";

import express from "express";
import { RELAY_PORT, RELAY_URL, QueryType } from "@lib/common";
import fetch from "node-fetch";
import morgan from "morgan";

import type { TokenType } from "./addMetadatas";
import { addMetadatas } from "./addMetadatas";

import { IncomingMessage, Server, ServerResponse } from "http";

const STATUS_RUNNING = "RUNNING";
const STATUS_STOPPING = "STOPPING";
const STATUS_STOPPED = "STOPPED";
const STATUS_ERROR = "ERROR";
const STATUS_STARTING = "STARTING";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => (res.send("NFT IPFS RELAY")));
app.get("/status", (req, res) => (res.send(STATUS_RUNNING)));
app.post("/query", (req, res) => (res.json(req.body)));

app.get("/stop", (req, res) => {
  res.send(STATUS_STOPPING);
  server.close();
});

app.post("/", async (req, res): Promise<void> => {
  const { endpointUrl, query } = req.body as QueryType;

  const json = await queryGraphQL(endpointUrl, query);

  const { tokens } = JSON.parse(json) as { tokens: Array<TokenType> };

  await addMetadatas(tokens);

  res.json(JSON.stringify(tokens, null, "  "));
});


const theRelayStatus = async (): Promise<string> => {
  let message = "";

  try {
    const resp: Response = await fetch(`${RELAY_URL}/status`);
    message = await resp.text();
  } catch (err) { message = STATUS_STOPPED; }

  // console.log("theRelayStatus", message);
  return message;
};

const theRelayStop = async (): Promise<string> => {
  let message = "";

  if (await theRelayStatus() == STATUS_STOPPED) {
    message = `ALREADY ${STATUS_STOPPED}`;
  } else {
    const resp: Response = await fetch(`${RELAY_URL}/stop`);
    message = await resp.text();
  }

  return message;
};

const theRelayStart = async (): Promise<string> => {
  let message = "";

  if (await theRelayStatus() == STATUS_RUNNING) {
    message = `ALREADY ${STATUS_RUNNING}`;
  } else {
    server = app.listen(RELAY_PORT, () => {
      console.log(`TheRelay listening on ${RELAY_URL}`);
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