import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "http://b0daa7185643.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
