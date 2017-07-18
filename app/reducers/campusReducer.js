import axios from 'axios';
import _ from 'lodash';

import {
	GOT_CAMPUSES, CREATE_CAMPUS, UPDATE_CAMPUS, DELETE_CAMPUS
	, gotCampuses, createCampus, updateCampus, deleteCampus
} from './campusActions';
import { ADD_STUDENT_TO_CAMPUS, REMOVE_STUDENT_FROM_CAMPUS } from './studentActions';

// THUNKS
export const getAllCampuses = () => dispatch => {
	return axios.get('/api/campuses')
		.then(res => dispatch(gotCampuses(res.data)))// dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

export const getOneCampus = id => dispatch => {
	console.log('to thunk');
	return axios.get(`/api/campuses/${id}`)
		.then(res => {
			console.log('thunk data', res.data);
			dispatch(gotCampuses(res.data));
		}) // dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

export const submitCampus = (campus, create) => dispatch => {
	if (!create) {
		return axios.put(`/api/campuses/${campus.id}`, campus)
			.then(() => dispatch(updateCampus(campus)))
			.catch(err => console.error(err));
	}
	else {
		return axios.post('/api/campuses', campus)
			.then(res => dispatch(createCampus(res.data)))
			.catch(err => console.error(err));
	}
};

export const removeCampus = campusId => dispatch => {
	return axios.delete(`/api/campuses/${campusId}`)
		.then(() => dispatch(deleteCampus(campusId)))
		.catch(err => console.error(err));
};

// REDUCER
export default function campusReducer(state = [], action) {
	const newState = [...state];
	const campusToChange = _.find(newState, campus => campus.id === action.campusId);

	switch (action.type) {
		case GOT_CAMPUSES:
			return action.campuses;

		case CREATE_CAMPUS:
			return [...state, action.campus];

		case UPDATE_CAMPUS:
			return state.map(campus => {
				return campus.id === action.campus.id ? action.campus : campus;
			});

		case ADD_STUDENT_TO_CAMPUS:
			campusToChange.students = [...campusToChange.students, action.student];
			return newState.map(campus => {
				return campus.id === campusToChange.id ? campusToChange : campus;
			});

		case REMOVE_STUDENT_FROM_CAMPUS:
			campusToChange.students = campusToChange.students.filter(student => student.id !== action.studentId);
			return newState.map(campus => {
				return campus.id === campusToChange.id ? campusToChange : campus;
			});

		case DELETE_CAMPUS:
			return state.filter(campus => campus.id !== action.campusId);

		default:
			return state;
	}
}
