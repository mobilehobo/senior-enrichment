import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';


function SingleCampus(props) {
		const students = props.campus && props.campus.students;

		return (
			<div>
				{
					// map over our campses and display an image with the name of each campus with a link to the single view
					students && students.map(student => {
						return (
							<div key={student.id}>
								<Link to={`/students/${student.id}`}>{student.name}</Link>
							</div>
						);
					})
				}
			</div>
		);
	}
// Put campuses on the props
const mapStateToProps = (state, ownProps) => {
	const campusId = +ownProps.match.params.id;
	return {
		campus: _.find(state.campuses, campus => campus.id === campusId)
	};
};

export default connect(mapStateToProps)(SingleCampus);
