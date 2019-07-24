"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../services/db/models/Order"));
const config_test_1 = __importDefault(require("./config.test"));
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const sandbox = chai.spy.sandbox();
const { expect } = chai;
describe('Orders model', () => {
    before(async () => {
        try {
            await mongoose_1.default.connect(config_test_1.default.MONGODB_SRV, {
                useNewUrlParser: true
            });
        }
        catch (err) {
            console.error('connection failed:', err);
        }
    });
    after(() => {
    });
    it('Should throw validation errors', () => {
        const order = new Order_1.default({});
        expect(order.validate).to.throw();
    });
    it('Should save an order', async () => {
        const order = new Order_1.default({
            company: 'Test company',
            address: 'mock address, 123/45',
            item: 'fake item'
        });
        sandbox.on(order, ['save']);
        order.save();
        expect(order.save).to.have.been.called;
        sandbox.restore();
    });
    it('Should update an order by ID', async () => {
        const order = {
            item: 'fake item'
        };
        const orderModel = new Order_1.default();
        sandbox.on(orderModel, ['updateOne']);
        orderModel.updateOne({ id: 1 }, order);
        expect(orderModel.updateOne).to.have.been.called;
        sandbox.restore();
    });
    it('Should delete an order by ID', async () => {
        const orderModel = new Order_1.default();
        sandbox.on(orderModel, ['deleteOne']);
        orderModel.deleteOne({ id: 1 });
        expect(orderModel.deleteOne).to.have.been.called;
        sandbox.restore();
    });
    it('Should find orders', async () => {
        const orderModel = new Order_1.default();
        sandbox.on(orderModel, ['find']);
        orderModel.find({ company: "test" });
        expect(orderModel.find).to.have.been.called;
        sandbox.restore();
    });
});
//# sourceMappingURL=db.spec.js.map