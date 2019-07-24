import { logger } from 'streembit-util';
import path from 'path';
import express from 'express';
import compression from 'compression';

// configs are small, let them be in process.env
import { config } from 'dotenv';
config({ path: '.env' });

// dealing with CORS
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
import cors from 'cors';
import bodyParser from 'body-parser';
import services from './services';

const { PORT = 8080, HOST = 'localhost' } = process.env;
const app = express();

try {
    // init logger
    logger.init(process.env.LOG_LEVEL, path.join(process.cwd(), './logs'));

    services.db.init();
    const server = services.gqServer();
    const gqlPath = '/data';

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ type: 'application/json' }));

    // adds a zlib based compression
    app.use(compression());

    // allow request from all hosts in demo purposes
    // to limit it by origin of the react app, cors({ origin: 'http://reactapp.com', credentials: true })
    app.use(cors({ origin: '*' }));

    server.applyMiddleware({ app, path: gqlPath });

    // eventually start the server
    app.set('port', PORT);
    app.listen(app.get('port'), HOST, (): void => {
        logger.info(`Listening on :${PORT} with GQL running on ${server.graphqlPath} ..`);
    });

} catch (err) {
    logger.error(
        `Server initialization failed. 
      Consider fix the error and restart.
      Error: ${err}`
    );
}

process.on('uncaughtException', function (err): void {
    logger.error((new Date).toUTCString(), ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
