import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loading from './Loading';

function SingleStudent(props) {
	const student = props.student;
	if (!student) return <Loading />; // if stuff is still loading

	return (
		<div>
			<p>{student.name}</p>
			<p>{student.email}</p>
			<Link to={`/campuses/${student.campusId}`}>Current school</Link>
		</div>
	);
}

// Put current student on the props
const mapStateToProps = (state, ownProps) => {
	const studentId = +ownProps.match.params.id; // make sure it's a number, else _.find won't find anything
	return {
		students: state.students, // to prevent no data from being available if going directly here
		student: _.find(state.students, student => student.id === studentId) // find a singluar student on our state and pass it in
	};
};

export default connect(mapStateToProps)(SingleStudent);
