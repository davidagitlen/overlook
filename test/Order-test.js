import Order from '../src/Order';
import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
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
let customer = new Customer('Bob', 51);
let customerOrder = {food: 'sammich', price: 200};

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

	describe('storeUnconfirmedOrders', () => {
		it('should push a new order into order\'s unconfirmedOrders array', () => {
			expect(order.unconfirmedOrders.length).to.equal(0);
			order.storeUnconfirmedOrders(hotel, customer, customerOrder);
			expect(order.unconfirmedOrders.length).to.equal(1);
			expect(order.unconfirmedOrders[0]).to.eql({userID: 51, date: '2019/07/25', food: 'sammich', totalCost: 200});
		});
	});

	describe('placeNewOrder', () => {
		it('should push orders into hotel\'s roomServices array', () => {
			expect(hotel.roomServices.length).to.equal(14);
			order.placeNewOrder(hotel);
			expect(hotel.roomServices.length).to.equal(15);
			expect(hotel.roomServices[14]).to.eql({userID: 51, date: '2019/07/25', food: 'sammich', totalCost: 200});
		});
	});

})