"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `    
    
    interface MutationResponse {
        result: Boolean!
        message: String
    }

    type Query {
        getOrders: [Orders]
        getCompanyOrders(company: String): [Orders]
        getAddressOrders(address: String): [Orders]
    }

    input addOrderInput {
        company: String
        address: String
        item: String
    }

    input updateOrderInput {
        company: String!
        address: String!
        item: String!
    }

    type Mutation {
        addOrder(company: String!, address: String!, item: String!): Orders,
        updateOrder(id: Int!, company: String, address: String, item: String): Orders,
        removeOrder(id: Int!): Orders
    }

    type Orders {
        _id: String
        id: String
        company: String
        address: String
        item: String
        created: String
        updated: String
    }
`;
//# sourceMappingURL=index.js.map