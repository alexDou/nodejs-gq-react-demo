import mongoose from 'mongoose';
import Orders from '../services/db/models/Order';
import config from './config.test';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const sandbox = chai.spy.sandbox();

const { expect } = chai;

describe('Orders model', () => {
    before(async () => {
        try {
            await mongoose.connect(config.MONGODB_SRV, {
                useNewUrlParser: true
            });
        } catch (err) {
            console.error('connection failed:', err);
        }
    });

    after(() => {

    });

    it('Should throw validation errors', () => {
        const order = new Orders({});

        expect(order.validate).to.throw();
    });

    it('Should save an order', async () => {
        const order = new Orders({
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

        const orderModel = new Orders();

        sandbox.on(orderModel, ['updateOne']);
        orderModel.updateOne(
          { id: 1 },
          order
        );

        expect(orderModel.updateOne).to.have.been.called;
        sandbox.restore();
    });

    it('Should delete an order by ID', async () => {
        const orderModel = new Orders();

        sandbox.on(orderModel, ['deleteOne']);
        orderModel.deleteOne({ id: 1 });

        expect(orderModel.deleteOne).to.have.been.called;
        sandbox.restore();
    });

    it('Should find orders', async () => {
        const orderModel = new Orders();

        sandbox.on(orderModel, ['find']);
        orderModel.find({ company: "test" });

        expect(orderModel.find).to.have.been.called;
        sandbox.restore();
    });
});
