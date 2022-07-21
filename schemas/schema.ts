import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, introspectionFromSchema, getIntrospectionQuery, IntrospectionQuery, buildSchema, buildClientSchema } from "graphql";
import fs from "fs";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    status: {
      type: GraphQLString,
      resolve(parent, args) {
        return "Welcome to GraphQL";
      },
    },
  },
});

// const schemaNfts = fs.readFileSync("../schemas/....gql", "utf8");

const schema = new GraphQLSchema({ query: RootQuery });

export { schema };
