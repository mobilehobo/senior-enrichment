// ACTIONS
export const GOT_STUDENTS = 'GOT_STUDENTS';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const ADD_STUDENT_TO_CAMPUS = 'ADD_STUDENT_TO_CAMPUS';
export const REMOVE_STUDENT_FROM_CAMPUS = 'REMOVE_STUDENT_FROM_CAMPUS';
export const DELETE_STUDENT = 'DELETE_STUDENT';

// ACION CREATORS
export const gotStudents = students => ({ type: GOT_STUDENTS, students });
export const createStudent = student => ({ type: CREATE_STUDENT, student });
export const updateStudent = student => ({ type: UPDATE_STUDENT, student });
export const addStudentToCampus = (campusId, student) => ({ type: ADD_STUDENT_TO_CAMPUS, student, campusId });
export const removeStudentFromCampus = (campusId, studentId) => ({ type: REMOVE_STUDENT_FROM_CAMPUS, studentId, campusId });
export const deleteStudent = studentId => ({ type: DELETE_STUDENT, studentId });
