import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';
import { removeStudent } from '../reducers';

function Students(props) {
	const students = props.students;
	if (!students) return <Loading />;

	return (
		<div>
			{
				// map over our students and display the name of each student with a link to the single view
				students.map(student => {
					return (
						<div key={student.id}>
							<Link to={`/students/${student.id}`}>{student.name}</Link>
							<button
								onClick={() => props.removeStudent(student.id)}
							>Delete Student</button>
						</div>
					);
				})
			}
		</div>
	);
}

// Put students on the props
const mapStateToProps = state => ({ students: state.students });

const mapDispatchToProps = { removeStudent };

export default connect(mapStateToProps, mapDispatchToProps)(Students);
