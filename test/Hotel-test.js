import Hotel from '../src/Hotel';
import mockData from '../src/mock-data';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let hotel = new Hotel(mockData.users, mockData.rooms, mockData.bookings, mockData.roomServices);
let evenRooms = mockData.rooms.filter(room => room.number % 2 === 0)
let oddRoomsBooked = mockData.bookings.filter(booking => booking.roomNumber % 2)

let setDate;

describe('Hotel', () => {
	// beforeEach(() => {
	// 	setDate = Date;
	// 	Date = () => {
	// 		return new setDate('07/25/2019');
	// 	}
	// });

	it('should be a function', () => {
		expect(Hotel).to.be.a('function');
	});

	it('should be an instance of Hotel', () => {
		expect(hotel).to.be.an.instanceof(Hotel);
	});

	it('should store all users', () => {
		expect(hotel.users).to.eql(mockData.users);
	});

	it('should store all rooms', () => {
		expect(hotel.rooms).to.eql(mockData.rooms);
	});

	it('should store all bookings', () => {
		expect(hotel.bookings).to.eql(mockData.bookings);
	});

	it('should store all room services', () => {
		expect(hotel.roomServices).to.eql(mockData.roomServices);
	});

	describe('getCurrentDate', () => {
		it.skip('should return today\'s date in the proper format', () => {
			expect(hotel.getCurrentDate()).to.equal('2019/07/25');
		});
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

	describe('getUnoccupiedRooms', () => {
		it('should return total unoccupied rooms for today\'s date', () => {
			expect(hotel.getUnoccupiedRooms('2019/07/25')).to.eql(evenRooms);
		});
	});

	describe('getTotalRevenue', () => {
		it('should return total revenue for today\'s date', () => {
			expect(hotel.getTotalRevenue('2019/07/25')).to.equal(2287.35);
		});
	});

})