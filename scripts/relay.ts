/* eslint-disable @typescript-eslint/no-misused-promises */
import { graphQL } from "@lib/graphQL";

import express from "express";
import { PORT, RelayType } from "@lib/common";

const app = express();
app.use(express.json());

app.get("/", (req, res) => (res.send("NFT IPFS RELAY")));
app.post("/query", (req, res) => (res.json(req.body)));

app.post("/", async (req, res): Promise<void> => {
  const { endpointUrl, query } = req.body as RelayType;

  const jsonResult = await graphQL(endpointUrl, query);

  res.json(jsonResult);
}
);

app.listen(PORT, () => (console.log(`Listening on http://127.0.0.1:${PORT}`)));
