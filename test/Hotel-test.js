import Hotel from '../src/Hotel';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();


let today = '2019/07/25';
let hotel = new Hotel(mockData, mockData, mockData, mockData, today);
let evenRooms = mockData.rooms.filter(room => room.number % 2 === 0);
let oddRooms = mockData.rooms.filter(room => room.number % 2);
let oddRoomsBooked = mockData.bookings.filter(booking => booking.roomNumber % 2);

describe('Hotel', () => {

	it('should be a function', () => {
		expect(Hotel).to.be.a('function');
	});

	it('should be an instance of Hotel', () => {
		expect(hotel).to.be.an.instanceof(Hotel);
	});

	it('should store all data correctly', () => {
		expect(hotel.users).to.eql(mockData.users);
		expect(hotel.rooms).to.eql(mockData.rooms);
		expect(hotel.bookings).to.eql(mockData.bookings);
		expect(hotel.roomServices).to.eql(mockData.roomServices);
	});

	describe('getTodaysBookings', () => {
		it('should return today\'s booked rooms', () => {
			expect(hotel.getTodaysBookings('2019/07/25')).to.eql(oddRoomsBooked);
		});
	});

	describe('getTodaysRoomServices', () => {
		it('should return room services ordered today', () => {
			expect(hotel.getTodaysRoomServices('2019/07/25')).to.eql(mockData.roomServices.slice(0,3));
		});
	});

	describe('getOccupiedRooms', () => {
		it('should return totall occupied rooms for today\'s date', () => {
			expect(hotel.getOccupiedRooms('2019/07/25')).to.eql(oddRooms);
		});
	});

	describe('getUnoccupiedRooms', () => {
		it('should return total unoccupied rooms for today\'s date', () => {
			expect(hotel.getUnoccupiedRooms('2019/07/25')).to.eql(evenRooms);
		});
	});

	describe('getTotalRevenue', () => {
		it('should return total revenue for today\'s date', () => {
			expect(hotel.getTotalRevenue('2019/07/25')).to.equal('2287.35');
		});
	});

	describe('getPercentageOccupied', () => {
		it('should return the percentage of rooms occupied for today\'s date', () => {
			expect(hotel.getPercentageOccupied('2019/07/25')).to.equal(53);
		});
	});

	describe('findCustomer', () => {
	chai.spy.on(domUpdates, ['displayUsers', 'noUserFound'], () => {});
		it('should fire displayUsers when valid customers have been found', () => {
			hotel.findCustomer('Matilde');
			expect(domUpdates.displayUsers).to.have.been.called(1);
		});
		it('should fire noUserFound when no valid customers have been found', () => {
			hotel.findCustomer('Gribjdjfb');
			expect(domUpdates.noUserFound).to.have.been.called(1);
		});
	});

})