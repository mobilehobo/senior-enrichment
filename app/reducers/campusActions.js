// ACTIONS
export const GOT_CAMPUSES = 'GOT_CAMPUSES';
export const CREATE_CAMPUS = 'CREATE_CAMPUS';
export const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

// ACION CREATORS
export const gotCampuses = campuses => ({ type: GOT_CAMPUSES, campuses });
export const createCampus = campus => ({ type: CREATE_CAMPUS, campus });
export const updateCampus = campus => ({ type: UPDATE_CAMPUS, campus });
export const deleteCampus = campusId => ({ type: DELETE_CAMPUS, campusId });
