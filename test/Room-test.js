import Room from '../src/Room';
import Hotel from '../src/Hotel';
import mockData from '../src/mock-data';
import domUpdates from '../src/domUpdates';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const spy = chai.spy();

let today = '2019/07/25';
let room = new Room();
let hotel = new Hotel(mockData.users, mockData.rooms, mockData.bookings, mockData.roomServices, today);


describe('Room', () => {
	it('should be a function', () => {
		expect(Room).to.be.a('function');
	});

	it('should be an instance of Room', () => {
		expect(room).to.be.an.instanceof(Room);
	});

	describe('findMostPopularDate', () => {
		it('should show the date with the most bookings', () => {
			expect(room.findMostPopularDate(hotel)).to.eql({date: '2019/07/25', bookings: 8});
		});
	});

	describe('findLeastPopularDate', () => {
		it('should show the date with the least bookings', () => {
			expect(room.findLeastPopularDate(hotel)).to.eql({date: '2019/09/06', bookings: 1});
		});
	});

	describe('showPolarDates', () => {
		chai.spy.on(domUpdates, ['defaultRoomTab'], () => {});
		it('should fire defaultRoomTab to display the dates with the most and least bookings', () => {
			room.showPolarDates(hotel);
			expect(domUpdates.defaultRoomTab).to.have.been.called(1);
		});
	});

	describe('makeNewBooking', () => {
		it('should put a new booking in hotel\'s bookings array', () => {
			expect(hotel.bookings.length).to.equal(15);
			let newBooking = { userID: 12, date: '2019/10/25', roomNumber: 12 };
			room.makeNewBooking(hotel, newBooking);
			expect(hotel.bookings.length).to.equal(16);
			expect(hotel.bookings[15]).to.eql(newBooking);
		});
	});

})