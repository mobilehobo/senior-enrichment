import axios from 'axios';

// ACTIONS
const GOT_STUDENTS = 'GOT_STUDENTS';

// ACION CREATORS
const gotStudents = students => ({ type: GOT_STUDENTS, students });

// THUNKS
export const getAllStudents = () => dispatch => {
	return axios.get('/api/students')
		.then(res => dispatch(gotStudents(res.data))) // dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

export const getOneStudent = id => dispatch => {
	return axios.get(`/api/students/${id}`)
		.then(res => dispatch(gotStudents(res.data))) // dispatch our action with the data, avoids chaining an additional promise
		.catch(err => console.error(err));
};

// REDUCER
export default function studentReducer(state = [], action) {
	switch (action.type) {
		case GOT_STUDENTS:
			return action.students;
		default:
			return state;
	}
}
