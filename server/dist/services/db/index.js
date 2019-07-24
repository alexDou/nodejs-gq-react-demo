"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const streembit_util_1 = require("streembit-util");
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("./models/Order"));
/** init mongoDB connection. */
function init() {
    mongoose_1.default
        .connect(process.env.MONGODB_SRV, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
        .then(() => streembit_util_1.logger.info('open mongoDB connection succeed'))
        .catch((err) => {
        throw new Error(`Error starting mongoose: ${err}. 
                trace: ${__dirname} ${__filename}`);
    });
}
exports.init = init;
/** expose models */
exports.models = {
    Orders: Order_1.default
};
//# sourceMappingURL=index.js.map