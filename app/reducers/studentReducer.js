import axios from 'axios';

import {
	GOT_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT
	, gotStudents, createStudent, updateStudent, deleteStudent, addStudentToCampus, removeStudentFromCampus
} from './studentActions';

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

export const submitStudent = (student, create) => dispatch => {
	if (!create) {
		return axios.put(`/api/students/${student.id}`, student)
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
	return axios.put(`/api/students/${studentId}`, { campusId })
		.then(res => {
			dispatch(addStudentToCampus(campusId, res.data));
			dispatch(updateStudent(res.data));
		})
		.catch(err => console.error(err));
};

export const removeFromCampus = student => dispatch => {
	const campusId = student.campusId;
	student.campusId = null;
	return axios.put(`/api/students/${student.id}`, student)
		.then(() => {
			dispatch(removeStudentFromCampus(campusId, student.id));
			dispatch(updateStudent(student));
		})
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
