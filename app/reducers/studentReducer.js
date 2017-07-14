import axios from 'axios';

// ACTIONS
const GOT_STUDENTS = 'GOT_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// ACION CREATORS
const gotStudents = students => ({ type: GOT_STUDENTS, students });
const createStudent = student => ({ type: CREATE_STUDENT, student });
const updateStudent = student => ({ type: UPDATE_STUDENT, student });
const deleteStudent = studentId => ({ type: DELETE_STUDENT, studentId });

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

export const submitStudent = (id, student) => dispatch => {
	if (id) {
		return axios.put(`/api/students/${id}`, student)
			.then(() => dispatch(updateStudent(student)))
			.catch(err => console.error(err));
	}
	else {
		return axios.post('/api/students', student)
			.then(res => dispatch(createStudent(res.data)))
			.catch(err => console.error(err));
	}
};

export const addToCampus = (campusId, studentId) => dispatch => {
	return axios.put(`/api/students/${studentId}`, {campusId})
		.then(res => dispatch(updateStudent(res.data)))
		.catch(err => console.error(err));
};

export const removeFromCampus = student => dispatch => {
	student.campusId = null;
	return axios.put(`/api/students/${student.id}`, student)
		.then(() => dispatch(updateStudent(student)))
		.catch(err => console.error(err));
};

export const removeStudent = studentId => dispatch => {
	return axios.delete(`/api/students/${studentId}`)
		.then(() => dispatch(deleteStudent(studentId)))
		.catch(err => console.error(err));
};

// REDUCER
export default function studentReducer(students = [], action) {
	switch (action.type) {
		case GOT_STUDENTS:
			return action.students;
		case CREATE_STUDENT:
			return [...students, action.student];
		case UPDATE_STUDENT:
			// map over current arrway and replace student with new data if id matches
			return students.map(student => {
				return student.id === action.student.id ? action.student : student;
			});
		case DELETE_STUDENT:
			// filter out the student with the id we just deleted from our state
			return students.filter(student => student.id !== action.studentId);
		default:
			return students;
	}
}
