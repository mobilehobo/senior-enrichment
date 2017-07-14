import axios from 'axios';

// ACTIONS
const GOT_STUDENTS = 'GOT_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';

// ACION CREATORS
const gotStudents = students => ({ type: GOT_STUDENTS, students });
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

export const removeStudent = studentId => dispatch => {
	console.log('id', studentId);
	return axios.delete(`/api/students/${studentId}`)
		.then(() => dispatch(deleteStudent(studentId)))
		.catch(err => console.error(err));
};

// REDUCER
export default function studentReducer(students = [], action) {
	switch (action.type) {
		case GOT_STUDENTS:
			return action.students;
		case DELETE_STUDENT:
			// filter out the student with the id we just deleted from our state
			return students.filter(student => student.id !== action.studentId);
		default:
			return students;
	}
}
