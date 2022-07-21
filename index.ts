import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema";

const PORT = 4000;
const app = express();

app.use("/hi", (req, res) => {
  res.send("Bonjour!");
});

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
