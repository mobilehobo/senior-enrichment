/* eslint new-cap: 0 */
'use strict';
const router = require('express').Router();

const db = require('../db');
const Campus = db.models.campus;

// get all campuses
router.get('/', (req, res, next) => {
	Campus.findAll()
		.then(campuses => {
			res.json(campuses);
		})
		.catch(next);
});

// create a campus and return the data
router.post('/', (req, res, next) => {
	Campus.create(req.body)
		.then(newCampus => {
			res.json(newCampus);
		})
		.catch(next);
});

// update a campus
router.put('/:id', (req, res, next) => {
	Campus.update(req.body, {
		where: {
			id: req.params.id
		}
	})
		.then(campus => {
			if (campus[0] > 0) res.json(campus);
			else throw new Error('Invalid campus id');
		})
		.catch(next);
});

// delete a campus
router.delete('/:id', (req, res, next) => {
	Campus.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(result => {
			if (result > 0) res.end();
			else throw new Error('Invalid campus id');
		})
		.catch(next);
});

// get one campus by its id
router.get('/:id', (req, res, next) => {
	Campus.findById(req.params.id)
		.then(campus => {
			res.json(campus);
		})
		.catch(next);
});

module.exports = router;
