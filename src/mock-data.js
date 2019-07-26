let mockData = {
	users: [
		{ id: 1, name: 'Matilde Larson' },
		{ id: 2, name: 'Chadrick Lowe' },
		{ id: 3, name: 'Christian Sporer' },
		{ id: 4, name: 'Brook Christiansen' },
		{ id: 5, name: 'Noemy Little' },
		{ id: 6, name: 'Winnifred Kris' },
		{ id: 7, name: 'Josianne Huels' },
		{ id: 8, name: 'Zachery Abbott' },
		{ id: 9, name: 'Paula Anderson' },
		{ id: 10, name: 'Chyna Gulgowski' }
		],
	rooms: [
	 	{ number: 1,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 265.03 },
    { number: 2,
      roomType: 'single room',
      bidet: true,
      bedSize: 'full',
      numBeds: 1,
      costPerNight: 228.01 },
    { number: 3,
      roomType: 'suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 275.99 },
    { number: 4,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 1,
      costPerNight: 177.03 },
    { number: 5,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 2,
      costPerNight: 246.65 },
    { number: 6,
      roomType: 'suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 211.42 },
    { number: 7,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 376.56 },
    { number: 8,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 1,
      costPerNight: 177.04 },
    { number: 9,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 327.76 },
    { number: 10,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 2,
      costPerNight: 296.48 },
    { number: 11,
      roomType: 'single room',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 216.05 },
    { number: 12,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 247.86 },
    { number: 13,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 1,
      costPerNight: 372.83 },
    { number: 14,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 207.64 },
    { number: 15,
      roomType: 'suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 163.1 },
		],
	bookings: [
		 { userID: 4, date: '2019/07/25', roomNumber: 1 },
     { userID: 29, date: '2019/10/30', roomNumber: 2 },
     { userID: 9, date: '2019/07/25', roomNumber: 3 },
     { userID: 88, date: '2019/08/28', roomNumber: 4 },
     { userID: 52, date: '2019/07/25', roomNumber: 5 },
     { userID: 34, date: '2019/09/05', roomNumber: 6 },
     { userID: 93, date: '2019/07/25', roomNumber: 7 },
     { userID: 98, date: '2019/08/27', roomNumber: 8 },
     { userID: 18, date: '2019/07/25', roomNumber: 9 },
     { userID: 69, date: '2019/09/27', roomNumber: 10 },
     { userID: 25, date: '2019/07/25', roomNumber: 11 },
     { userID: 13, date: '2019/09/29', roomNumber: 12 },
     { userID: 36, date: '2019/07/25', roomNumber: 13 },
     { userID: 5, date: '2019/09/06', roomNumber: 14 },
     { userID: 35, date: '2019/07/25', roomNumber: 15 },
    ],
  roomServices: [
  	 { userID: 14,
       date: '2019/07/25',
       food: 'Rustic Concrete Sandwich',
       totalCost: 14.9 },
     { userID: 100,
       date: '2019/07/25',
       food: 'Rustic Cotton Sandwich',
       totalCost: 17.33 },
     { userID: 92,
       date: '2019/07/25',
       food: 'Tasty Wooden Sandwich',
       totalCost: 11.15 },
     { userID: 8,
       date: '2019/08/02',
       food: 'Practical Granite Sandwich',
       totalCost: 14.87 },
     { userID: 48,
       date: '2019/09/26',
       food: 'Fantastic Cotton Sandwich',
       totalCost: 17.61 },
     { userID: 23,
       date: '2019/09/11',
       food: 'Awesome Cotton Sandwich',
       totalCost: 20.79 },
     { userID: 12,
       date: '2019/10/25',
       food: 'Refined Metal Sandwich',
       totalCost: 12.32 },
     { userID: 86,
       date: '2019/09/16',
       food: 'Incredible Concrete Sandwich',
       totalCost: 24.77 },
     { userID: 55,
       date: '2019/10/18',
       food: 'Unbranded Wooden Sandwich',
       totalCost: 7.95 },
     { userID: 55,
       date: '2019/10/17',
       food: 'Intelligent Fresh Sandwich',
       totalCost: 12.32 },
     { userID: 97,
       date: '2019/08/06',
       food: 'Unbranded Wooden Sandwich',
       totalCost: 12.83 },
     { userID: 88,
       date: '2019/08/11',
       food: 'Handcrafted Rubber Sandwich',
       totalCost: 22.45 },
     { userID: 36,
       date: '2019/08/17',
       food: 'Tasty Granite Sandwich',
       totalCost: 18.73 },
     { userID: 30,
       date: '2019/08/12',
       food: 'Refined Cotton Sandwich',
       totalCost: 12.65 }
    ]
 }

 export default mockData;