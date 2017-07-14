import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loading from './Loading';
import { submitStudent } from '../reducers';

class SingleStudent extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmitStudentData = this.handleSubmitStudentData.bind(this);
	}
	render() {
		const student = this.props.student;
		if (!student) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

		return (
			<div>
				<p>{student.name}</p>
				<p>{student.email}</p>
				<Link to={`/campuses/${student.campusId}`}>Current school</Link>
				<hr />
				<form onSubmit={this.handleSubmitStudentData}>
					<label htmlFor="studentName">Student Name</label>
					<input name="studentName" type="text" placeholder="Enter a name" defaultValue={student.name} />

					<label htmlFor="studentEmail">Student E-mail</label>
					<input name="studentEmail" type="text" placeholder="Enter their e-mail" defaultValue={student.email} />

					<label htmlFor="studentCampus">Student Campus</label>
					<input name="studentCampus" type="number" placeholder="Enter a campus id" defaultValue={student.campusId} />

					<label htmlFor="submitStudentData">Submit Changes</label>
					<input name="submitStudentData" type="submit" />
				</form>
			</div>
		);
	}

	handleSubmitStudentData(event) {
		event.preventDefault();
		const student = {
			name: event.target.studentName.value,
			email: event.target.studentEmail.value,
			campusId: event.target.studentCampus.value
		};
		this.props.submitStudent(this.props.match.params.id, student);
	}
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

const mapDispatchToProps = { submitStudent };

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
