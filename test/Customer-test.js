import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let today = '2019/07/25';
let hotel = new Hotel(mockData, mockData, mockData, mockData, today);
let customer = new Customer('Matilde Larson', 1);
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

	describe('findMyTotal', () => {
		it('should show customer\'s all-time total for room service orders', () => {
			expect(customer.findMyTotal(hotel)).to.equal('38.37')
		});
	});


})