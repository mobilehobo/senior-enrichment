const Sequelize = require('sequelize');

const db = require('../');
const Student = db.models.student;

module.exports = db.define('campus', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	image: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	}
}, {
		defaultScope: {
			include: [Student]
		}
	});
