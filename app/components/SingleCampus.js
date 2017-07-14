import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import Loading from './Loading';

function SingleCampus(props) {
	const campus = props.campus;

	if (!campus) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined
	const students = campus.students || [];

	return (
		<div>
			<img src={campus.image} alt={campus.name} />
			<h3>{campus.name}</h3>
			<h4>Current Students:</h4>
			<ul>
				{
					// map over our campses and display an image with the name of each campus with a link to the single view
					students.map(student => {
						return (
							<li key={student.id}>
								<Link to={`/students/${student.id}`}>{student.name}</Link>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

// Put current campus on the props
const mapStateToProps = (state, ownProps) => {
	const campusId = +ownProps.match.params.id; // make sure it's a number, else _.find won't find anything
	return {
		campuses: state.campuses, // to prevent no data from being available if going directly here
		campus: _.find(state.campuses, campus => campus.id === campusId) // find a singluar campus on our state and pass it in
	};
};

export default connect(mapStateToProps)(SingleCampus);
