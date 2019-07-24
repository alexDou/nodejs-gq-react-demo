"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const db_1 = require("../db");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = require("./resolvers");
const schema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false },
});
function gqServer() {
    return new apollo_server_express_1.ApolloServer({
        schema,
        context: db_1.models
    });
}
exports.gqServer = gqServer;
//# sourceMappingURL=index.js.map