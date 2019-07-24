"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const streembit_util_1 = require("streembit-util");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
// configs are small, let them be in process.env
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: '.env' });
// dealing with CORS
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const services_1 = __importDefault(require("./services"));
const { PORT = 8080, HOST = 'localhost' } = process.env;
const app = express_1.default();
try {
    // init logger
    streembit_util_1.logger.init(process.env.LOG_LEVEL, path_1.default.join(process.cwd(), './logs'));
    services_1.default.db.init();
    const server = services_1.default.gqServer();
    const gqlPath = '/data';
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json({ type: 'application/json' }));
    // adds a zlib based compression
    app.use(compression_1.default());
    // allow request from all hosts in demo purposes
    // to limit it by origin of the react app, cors({ origin: 'http://reactapp.com', credentials: true })
    app.use(cors_1.default({ origin: '*' }));
    server.applyMiddleware({ app, path: gqlPath });
    // eventually start the server
    app.set('port', PORT);
    app.listen(app.get('port'), HOST, () => {
        streembit_util_1.logger.info(`Listening on :${PORT} with GQL running on ${server.graphqlPath} ..`);
    });
}
catch (err) {
    streembit_util_1.logger.error(`Server initialization failed. 
      Consider fix the error and restart.
      Error: ${err}`);
}
process.on('uncaughtException', function (err) {
    streembit_util_1.logger.error((new Date).toUTCString(), ' uncaughtException:', err.message);
    streembit_util_1.logger.error(err.stack);
    process.exit(1);
});
//# sourceMappingURL=app.js.map