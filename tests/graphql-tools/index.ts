import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "@graphql-yoga/node";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer({
  schema: executableSchema,
});

server.start().catch(console.error);
