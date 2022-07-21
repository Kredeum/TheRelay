import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } from "graphql";

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
const schema = new GraphQLSchema({ query: RootQuery });

export { schema };
