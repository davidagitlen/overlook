import Order from '../src/Order';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let order = new Order();

describe('Order', () => {
	it('should be a function', () => {
		expect(Order).to.be.a('function');
	});

	it('should be an instance of Order', () => {
		expect(order).to.be.an.instanceof(Order);
	});

})