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
let hotel = new Hotel(mockData.users, mockData.rooms, mockData.bookings, mockData.roomServices, today);
let customer = new Customer('Matilde Larson', 1);
let anotherCustomer = new Customer('Brook Christiansen', 4);
let customerOrders = mockData.roomServices.filter(service => service.userID === 1);

describe('Customer', () => {
	it('should be a function', () => {
		expect(Customer).to.be.a('function');
	});

	it('should be an instance of Customer', () => {
		expect(customer).to.be.an.instanceof(Customer);
	});
	
	describe('findMyOrders', () => {
		it('should show all customer room service orders', () => {
			expect(customer.findMyOrders(hotel)).to.eql(customerOrders);
		});
	});

	describe('showMyOrders', () => {
		chai.spy.on(domUpdates, ['displayCustomerOrders', 'noOrdersFound'], () => {});
		it('should fire displayCustomerOrders when a customer has placed orders', () => {
			customer.showMyOrders(hotel);
			expect(domUpdates.displayCustomerOrders).to.have.been.called(1);
		});
		it('should fire noOrdersFound when a customer has never placed an order', () => {
			anotherCustomer.showMyOrders(hotel);
			expect(domUpdates.noOrdersFound).to.have.been.called(1);
		});
	});

	describe('findMyTotal', () => {
		it('should show customer\'s all-time total for room service orders', () => {
			expect(customer.findMyTotal(hotel)).to.equal('38.37')
		});
	});


})