import Customer from '../src/Customer';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let customer = new Customer(); 

describe('Customer', () => {
	it('should be a function', () => {
		expect(Customer).to.be.a('function');
	});

	it('should be an instance of Customer', () => {
		expect(customer).to.be.an.instanceof(Customer);
	});
	
})