import { combineReducers } from 'redux';

import campuses from './campusReducer';
import students from './studentReducer';

const rootReducer = combineReducers({campuses, students});

export default rootReducer;
export * from './campusReducer';
export * from './studentReducer';
