'use strict';
const api = require('express').Router();

const db = require('../db');
const Campus = db.models.campus;
const Student = db.models.student;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({ hello: 'world' }));

// get all campuses
api.get('/campuses', (req, res, next) => {
	Campus.findAll()
		.then(campuses => {
			res.json(campuses);
		})
		.catch(next);
});

// create a campus and return the data
api.post('/campuses', (req, res, next) => {
	Campus.create(req.body)
		.then(newCampus => {
			res.json(newCampus);
		})
		.catch(next);
});

// update a campus
api.put('/campuses', (req, res, next) => {
	Campus.update(req.body, {
		where: {
			id: req.body.id
		}
	})
		.then(campus => {
			if (campus[0] > 0) res.json(campus);
			else throw new Error('Invalid campus id');
		})
		.catch(next);
});

// delete a campus
api.delete('/campuses', (req, res, next) => {
	Campus.destroy({
		where: {
			id: req.body.id
		}
	})
		.then(result => {
			console.log(result);
			if (result > 0) res.end();
			else throw new Error('Invalid campus id');
		})
		.catch(next);
});

// get one campus by its id
api.get('campuses/:id', (req, res, next) => {
	Campus.findById(req.params.id)
		.then(campus => {
			res.json(campus);
		})
		.catch(next);
});


// get all students
api.get('/students', (req, res, next) => {
	Student.findAll()
		.then(students => {
			res.json(students);
		})
		.catch(next);
});

// create a new student and return the data
api.post('/students', (req, res, next) => {
	Student.create(req.body)
		.then(newStudent => {
			res.json(newStudent);
		})
		.catch(next);
});

// update a student
api.put('/students', (req, res, next) => {
	Student.update(req.body, {
		where: {
			id: req.body.id
		}
	})
		.then(student => {
			if (student[0] > 0) res.json(student);
			else throw new Error('Invalid student id');
		})
		.catch(next);
});

// delete a student
api.delete('/students', (req, res, next) => {
	Student.destroy({
		where: {
			id: req.body.id
		}
	})
		.then(result => {
			if (result > 0) res.end();
			else throw new Error('Invalid student id');
		})
		.catch(next);
});

// get one student by their id
api.get('students/:id', (req, res, next) => {
	Student.findById(req.params.id)
		.then(student => {
			res.json(student);
		})
		.catch(next);
});

module.exports = api;
