import axios from 'axios';

// ACTIONS
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

// ACION CREATORS
const gotCampuses = campuses => ({ type: GOT_CAMPUSES, campuses });
const addCampus = campus => ({ type: ADD_CAMPUS, campus });
const deleteCampus = campusId => ({ type: DELETE_CAMPUS, campusId });

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

export const submitCampus = campus => dispatch => {
	return axios.post('/api/campuses', campus)
		.then(res => dispatch(addCampus(res.data)))
		.catch(err => console.error(err));
};

export const removeCampus = campusId => dispatch => {
	return axios.delete(`/api/campuses/${campusId}`)
		.then(() => dispatch(deleteCampus(campusId)))
		.catch(err => console.error(err));
};

// REDUCER
export default function campusReducer(state = [], action) {
	switch (action.type) {
		case GOT_CAMPUSES:
			return action.campuses;
		case ADD_CAMPUS:
			return [...state, action.campus];
		case DELETE_CAMPUS:
			return state.filter(campus => campus.id !== action.campusId);
		default:
			return state;
	}
}
