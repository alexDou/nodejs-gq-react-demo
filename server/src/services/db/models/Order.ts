import mongoose, { Schema, Document } from 'mongoose';

// take advantage of this package to
// implement auto-increment behavior
// on order ID field
import ai from 'mongoose-sequence';
const autoIncrement  = ai(mongoose);

export interface IOrder extends Document {
    id?: number,
    company: string;
    address: string;
    item: string;
    created?: string,
    updated?: string
}

const Schema = mongoose.Schema;

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
export default mongoose.model<IOrder>('Orders', OrdersSchema);
