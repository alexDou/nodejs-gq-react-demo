import { logger } from 'streembit-util';
import mongoose from 'mongoose';
import Orders from './models/Order';

/** init mongoDB connection. */
export function init(): void {
    mongoose
        .connect(process.env.MONGODB_SRV, { useCreateIndex: true,  useNewUrlParser: true, useFindAndModify: false })
        .then((): void => logger.info('open mongoDB connection succeed'))
        .catch((err): never => {
            throw new Error(
                `Error starting mongoose: ${err}. 
                trace: ${__dirname} ${__filename}`
            );
        });
}

/** expose models */
export const models = {
    Orders
};
