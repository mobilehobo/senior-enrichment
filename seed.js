const Bluebird = require('bluebird');

const db = require('./db');
const Campus = db.models.campus;
const Student = db.models.student;

const students = [
	{
		name: 'Gabriel Rue',
		email: 'gabe@rue.com'
	},
	{
		name: 'Boo Far',
		email: 'boo@far.com'
	},
	{
		name: 'Roo Raf',
		email: 'roo@baf.com'
	},
	{
		name: 'Arf Garblefarble',
		email: 'garble@farble.com'
	},
	{
		name: 'Hurgus Burgus',
		email: 'hurgus@burgus.com'
	}
];

const campuses = [
	{
		name: 'Fullstack Academy',
		image: '/images/fullstack.png',
		students: [
			students[0],
			students[1]
		]
	},
	{
		name: 'Grace Hopper Academy',
		image: '/images/gracehopper.png',
		students: [
			students[2],
			students[3]
		]
	},
	{
		name: 'Thunk University',
		image: '/images/thunking.png',
		students: students[4]
	}
];

db.sync({ force: true })
	.then(() => {
		return Bluebird.map(campuses, campus => {
			return Campus.create(campus, {
				include: [Student]
			});
		});
	})
	.then(() => console.log('done inserting'))
	.catch(err => console.error(err))
	.finally(() => {
		db.close();
		console.log('see ya later');
		return null; // avoid being yelled at for not returning
	});
