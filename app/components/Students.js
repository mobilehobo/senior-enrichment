import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Students(props) {
	const students = props.students;
	return (
		<div>
			{
				// map over our students and display an image with the name of each student with a link to the single view
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

// Put students on the props
const mapStateToProps = state => ({ students: state.students });

export default connect(mapStateToProps)(Students);
