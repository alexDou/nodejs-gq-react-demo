import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

import { models } from '../db';
import typeDefs  from './schema';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false },
});

export function gqServer(): ApolloServer {
    return new ApolloServer({
        schema,
        context: models
    });
}
