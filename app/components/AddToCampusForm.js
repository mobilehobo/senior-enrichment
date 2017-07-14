import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Loading from './Loading';
import { addToCampus } from '../reducers';

class AddToCampusForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmitAddToCampus = this.handleSubmitAddToCampus.bind(this);
	}

	render() {
		let campus = this.props.campus;
		if (!campus) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

		// only show students in the add menu that don't go here already
		const students = _.differenceWith(this.props.students, campus.students, _.isEqual);

		return (
			<div>
				<hr />
				<form onSubmit={this.handleSubmitAddToCampus}>
					<select name="selectStudent">
						{
							students.map(student => {
								return (
									<option key={student.id} value={student.id}>{student.name}</option>
								);
							})
						}
					</select>

					<label htmlFor="submitAddToCampus">Add Student to this Campus</label>
					<input name="submitAddToCampus" type="submit" />
				</form>
			</div>
		);
	}

	handleSubmitAddToCampus(event) {
		event.preventDefault();
		const studentId = event.target.selectStudent.value;
		const id = this.props.campus.id;
		this.props.addToCampus(id, studentId);
	}
}

const mapStateToProps = state => ({ students: state.students });

const mapDispatchToProps = { addToCampus };

export default connect(mapStateToProps, mapDispatchToProps)(AddToCampusForm);
