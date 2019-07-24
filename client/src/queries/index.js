import { gql } from 'apollo-boost';

export const GET_ORDERS = gql`
    query {
        getOrders {
            id
            company
            address
            item
            created
            updated
        }
    }
`;

export const GET_COMPANY_ORDERS = gql`
    query($company: String!) {
        getCompanyOrders(company: $company) {
            id
            company
            address
            item
            created
            updated
        }
    }
`;

export const GET_ADDRESS_ORDERS = gql`
    query($address: String!) {
        getAddressOrders(address: $address) {
            id
            company
            address
            item
            created
            updated
        }
    }
`;

export const ADD_ORDER = gql`
    mutation($company: String!, $address: String!, $item: String!) {
        addOrder(company: $company, address: $address, item: $item) {
            id
            item
            created
        }
    }
`

export const REMOVE_ORDER = gql`
    mutation($removeId: Int!) {
        removeOrder(id: $removeId) {
            id
        }
    }
`
