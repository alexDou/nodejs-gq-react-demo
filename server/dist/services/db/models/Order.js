"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// take advantage of this package to
// implement auto-increment behavior
// on order ID field
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const autoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const Schema = mongoose_1.default.Schema;
const OrdersSchema = new Schema({
    id: {
        type: Number,
        index: true
    },
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated: {
        type: Date,
        default: Date.now,
    }
});
// SQL-like auto-increment that does not reset on removal
OrdersSchema.plugin(autoIncrement, { inc_field: 'id' });
exports.default = mongoose_1.default.model('Orders', OrdersSchema);
//# sourceMappingURL=Order.js.map