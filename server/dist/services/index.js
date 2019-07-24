"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("./db/"));
const graphql_1 = require("./graphql");
exports.default = {
    db,
    gqServer: graphql_1.gqServer
};
//# sourceMappingURL=index.js.map