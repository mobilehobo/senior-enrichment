/* eslint new-cap: 0 */
'use strict';
const router = require('express').Router();

const db = require('../db');
const Student = db.models.student;

// get all students
router.get('/', (req, res, next) => {
	Student.findAll()
		.then(students => {
			res.json(students);
		})
		.catch(next);
});

// create a new student and return the data
router.post('/', (req, res, next) => {
	Student.create(req.body)
		.then(newStudent => {
			res.json(newStudent);
		})
		.catch(next);
});

// update a student
router.put('/', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
	Student.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(result => {
			if (result > 0) res.end();
			else throw new Error('Invalid student id');
		})
		.catch(next);
});

// get one student by their id
router.get('/:id', (req, res, next) => {
	Student.findById(req.params.id)
		.then(student => {
			res.json(student);
		})
		.catch(next);
});

module.exports = router;
