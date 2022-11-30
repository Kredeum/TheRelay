/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Response } from "node-fetch";

import express from "express";
import {
  THERELAY_URL, THERELAY_RUNNING, THERELAY_STOPPING,
  THERELAY_STOPPED, THERELAY_STARTING
} from "@lib/types";
import fetch from "node-fetch";
import morgan from "morgan";

import { IncomingMessage, Server, ServerResponse } from "http";
import cors from "cors";
import { queryGraphQL } from "@lib/query/queryGraphQL";
import { metadataAdds, TokenType } from "@lib/metadata/metadataAdd";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

const app = express();
app.use(cors());
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
  // console.log("POST", req.body);
  // console.log("POST", req);

  const { query, chainId } = req.body as { query: string, chainId?: number };
  if (!query) {
    console.error("ERROR TheRelay no query");
    res.json("no query"); return;
  }

  const endpoint = `https:/${req.path}`;
  if (!endpoint) {
    console.error("ERROR TheRelay no endpoint");
    res.json("no endpoint"); return;
  }
  // console.log(query);

  const json = await queryGraphQL(endpoint, query);
  // console.log("TheGraph", json);

  const { nfts } = JSON.parse(json) as { nfts: Array<TokenType> };
  // console.log("app.post ~ nfts", nfts);

  await metadataAdds(nfts, chainId);

  const jsonMetadata = JSON.stringify(nfts, null, "  ");
  // console.log("TheRelay", jsonMetadata);

  res.json(jsonMetadata);
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
  const theRelayPort = new URL(THERELAY_URL).port;

  if (await theRelayStatus() == THERELAY_RUNNING) {
    message = `ALREADY ${THERELAY_RUNNING}`;
  } else {
    message = THERELAY_STARTING;
    server = app.listen(theRelayPort, () => {
      console.info(`TheRelay listening on ${THERELAY_URL}`);
    });
  }

  return message;
};

const theRelay = async (cmd: string): Promise<string> => {
  if (cmd == "stop") return await theRelayStop();
  if (cmd == "status") return await theRelayStatus();
  if (cmd == "start") return await theRelayStart();
  return "Unknown command";
};


export { theRelay, theRelayStatus };