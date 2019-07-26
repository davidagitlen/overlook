import Room from '../src/Room';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let room = new Room();

describe('Room', () => {
	it('should be a function', () => {
		expect(Room).to.be.a('function');
	});

	it('should be an instance of Room', () => {
		expect(room).to.be.an.instanceof(Room);
	});

})