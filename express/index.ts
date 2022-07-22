import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { remoteGraphQL } from "./remote";
import proxy from "express-http-proxy";

const PORT = 4000;
const app = express();
const URL = "https://api.publicapis.org";

app.use("/hi", (req, res) => {
  res.send("Bonjour!");
});

app.use("/api", async (req, res) => {
  res.send(await remoteGraphQL());
});

// app.use("/", proxy(URL));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${4000}`);
});
