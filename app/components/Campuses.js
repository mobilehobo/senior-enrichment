import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';
import CampusForm from './CampusForm';
import { submitCampus, removeCampus } from '../reducers';

function Campuses(props) {
	const campuses = props.campuses;
	if (!campuses) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

	return (
		<div>
			{
				// map over our campses and display an image with the name of each campus with a link to the single view
				campuses.map(campus => {
					return (
						<div key={campus.id}>
							<Link to={`/campuses/${campus.id}`}><img src={campus.image} alt={campus.name} /></Link>
							<button
								onClick={() => props.removeCampus(campus.id)}
							>Delete Campus</button>
						</div>
					);
				})
			}
			<CampusForm create="true" />
		</div>
	);
}

// Put campuses on the props
const mapStateToProps = state => ({ campuses: state.campuses });

const mapDispatchToProps = { submitCampus, removeCampus };

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
