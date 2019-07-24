import { gql } from 'apollo-server-express';

export default gql`    
    
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
