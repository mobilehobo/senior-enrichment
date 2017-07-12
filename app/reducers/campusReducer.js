import axios from 'axios';

// ACTIONS
const GOT_CAMPUSES = 'GOT_CAMPUSES';

// ACION CREATORS
const gotCampuses = campuses => ({ type: GOT_CAMPUSES, campuses });

// THUNKS
export const getAllCampuses = () => dispatch => {
	return axios.get('/api/campuses')
		.then(res => dispatch(gotCampuses(res.data)))// dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

export const getOneCampus = id => dispatch => {
	return axios.get(`/api/campuses/${id}`)
		.then(res => dispatch(gotCampuses(res.data))) // dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

// REDUCER
export default function campusReducer(state = [], action) {
	switch (action.type) {
		case GOT_CAMPUSES:
			return action.campuses;
		default:
			return state;
	}
}
