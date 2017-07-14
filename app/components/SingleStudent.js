import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loading from './Loading';
import StudentForm from './StudentForm';

function SingleStudent(props) {
	const student = props.student;
	if (!student) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

	return (
		<div>
			<p>{student.name}</p>
			<p>{student.email}</p>
			{
				student.campusId && <Link to={`/campuses/${student.campusId}`}>Current school</Link>
			}
			<StudentForm student={student} />
		</div>
	);
}

// Put current student on the props
const mapStateToProps = (state, ownProps) => {
	const studentId = +ownProps.match.params.id; // make sure it's a number, else _.find won't find anything
	return {
		// to prevent no data from being available if going directly here
		students: state.students,

		// find a singluar student on our state and pass it in to props
		student: _.find(state.students, student => student.id === studentId)
	};
};

export default connect(mapStateToProps)(SingleStudent);
