const { ApolloServer, gql, ApolloError } = require('apollo-server');
const MockAPI = require('./datasources/mockAPI');

const ERR_INTERNAL_SERVER = 'INTERNAL_SERVER_ERROR';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./schema.js');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = require('./resolvers.js');

const dataSources = () => ({
  mockAPI: new MockAPI(),
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  // debug: false,
  introspection: true,
  playground: true,
  // formatError: error => {
  //   if (err.extensions.code === ERR_INTERNAL_SERVER) {
  //     return new ApolloError('Sorry, We found an error, Try again... ');
  //   }
  // },
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
  //console.log(`🚀  Server ready at ${url}`);
  //console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
