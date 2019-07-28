import Order from '../src/Order';
import Hotel from '../src/Hotel';
import mockData from '../src/mock-data';
import domUpdates from '../src/domUpdates';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let today = '2019/07/25';
let todaysOrder = {user: 'Zachery Abbott', room: 6, item: 'Practical Granite Sandwich', price: 14.87};
let hotel = new Hotel(mockData.users, mockData.rooms, mockData.bookings, mockData.roomServices, today);
let order = new Order(today);

describe('Order', () => {
	it('should be a function', () => {
		expect(Order).to.be.a('function');
	});

	it('should be an instance of Order', () => {
		expect(order).to.be.an.instanceof(Order);
	});

	describe('getOrders', () => {
		it('should find all of today\'s orders and return them with relevant user/booking data', () => {
			expect(order.getOrders(hotel, '2019/08/02')[0]).to.eql(todaysOrder);
		});
	});

	describe('showOrders', () => {
		chai.spy.on(domUpdates, ['defaultOrders', 'defaultNoOrders'], () => {})
		it('should fire defaultOrders if there are orders for today', () => {
			order.showOrders(hotel, '2019/08/02');
			expect(domUpdates.defaultOrders).to.have.been.called(1);
		});
		it('should fire defaultNoOrders if there are no orders for today', () => {
			order.showOrders(hotel, '2019/01/01');
			expect(domUpdates.defaultNoOrders).to.have.been.called(1);
		});
	});

})