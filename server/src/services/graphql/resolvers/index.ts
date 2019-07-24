import { logger } from 'streembit-util';
import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
    // Queries
    // aggregation not applied intentionally
    Query: {
        /** get orders unconditionally. */
        getOrders: async (root, {}, { Orders }) => {
            try {
                const orders = await Orders.find({});
                return orders;
            } catch (err) {
                logger.error(err);
            }

            return null;
        },

        /**
         * get orders by a company.
         *
         * @param {company} string - name, or part of a name of a company
         * @returns [Orders] | null
         */
        getCompanyOrders: async (root, { company }, { Orders }) => {
            try {
                const orders = await Orders.find({ company: {'$regex': company, '$options': 'i'} });
                return orders;
            } catch (err) {
                logger.error(err);
            }

            return null;
        },

        /**
         * get orders by address.
         *
         * @param {address} string - address, or part of an order address
         * @returns [Orders] | null
         */
        getAddressOrders: async (root, { address }, { Orders }) => {
            try {
                const orders = await Orders.find({ address: {'$regex': address, '$options': 'i'} });
                return orders;
            } catch (err) {
                logger.error(err);
            }

            return null;
        }
    },

    // Mutations
    Mutation: {
        /**
         * add an order.
         *
         * @param {company} string - name of a company
         * @param {address} string - order address
         * @param {item} item - item name
         * @returns Document | null
         */
        addOrder: async (root, { company, address, item }, { Orders }) => {
            try {
                return await new Orders({
                    company, address, item
                }).save();
            } catch (err) {
                logger.error(err);
                return null;
            }
        },

        /**
         * update an order by order ID.
         *
         * @param {id} number - unique ID of an order
         * @param {company} string - name of a company
         * @param {address} string - order address
         * @param {item} item - item name
         * @returns Document | null
         */
        updateOrder: async (root, { id, company, address, item }, { Orders }) => {
            const args = { company, address, item };
            const argsKeys = Object.keys(args);

            // filter out falsy args
            const upd = {};
            for (let key = 0; key < argsKeys.length; key++) {
                if (args[argsKeys[key]]) {
                    upd[argsKeys[key]] = args[argsKeys[key]];
                }
            }

            try {
                const editOrder = await Orders.updateOne(
                    { id: id },
                    upd
                );

                if (editOrder.nModified > 0) {
                    return upd;
                }
            } catch (err) {
                logger.error(err);
            }

            return null;
        },

        /**
         * remove an order by order ID.
         *
         * @param {id} number - unique ID of an order
         * @returns Document | null
         */
        removeOrder: async (root, { id }, { Orders }) => {
            try {
                const del = await Orders.deleteOne({ id: id });

                if (del.deletedCount > 0) {
                    return del;
                }
            } catch (err) {
                logger.error(err);
            }

            return null;
        }
    }
};
