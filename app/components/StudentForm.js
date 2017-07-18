import React from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import { submitStudent, addToCampus, removeFromCampus } from '../reducers';

class StudentForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmitStudentData = this.handleSubmitStudentData.bind(this);
	}

	render() {
		let student = this.props.student;
		if (this.props.create) student = { name: '', email: '', campusId: 0 }; // if we're creating a student and not just updating info
		const campuses = this.props.campuses;
		if (!student || !campuses) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

		return (
			<div>
				<hr />
				<form onSubmit={this.handleSubmitStudentData}>
					<label htmlFor="studentName">Student Name</label>
					<input name="studentName" type="text" placeholder="Enter a name" defaultValue={student.name} />

					<label htmlFor="studentEmail">Student E-mail</label>
					<input name="studentEmail" type="text" placeholder="Enter their e-mail" defaultValue={student.email} />

					<label htmlFor="studentCampus">Student Campus</label>
					<select name="studentCampus" defaultValue={student.campusId}>
						{
							campuses.map(campus => {
								return (
									<option key={campus.id} value={campus.id}>{campus.name}</option>
								);
							})
						}
					</select>

					<label htmlFor="submitStudentData">Submit Changes</label>
					<input name="submitStudentData" type="submit" />
				</form>
			</div>
		);
	}

	handleSubmitStudentData(event) {
		event.preventDefault();
		const name = event.target.studentName.value;
		const email = event.target.studentEmail.value;
		const campusId = +event.target.studentCampus.value;

		const student = {
			name,
			email,
			campusId
		};

		let create = false;
		if (this.props.create) create = true;
		else student.id = this.props.student.id;

		if (this.props.student.campusId !== campusId && !this.props.create) {
			this.props.addToCampus(campusId, student.id);
		}
		else {
			this.props.submitStudent(student, create); // pass in null if we're creating a student
		}

		if (this.props.create) {
			event.target.studentName.value = '';
			event.target.studentEmail.value = '';
			event.target.studentCampus.value = '';
		}
	}
}

const mapStateToProps = state => ({ campuses: state.campuses });

const mapDispatchToProps = { submitStudent, addToCampus };

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
