import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';

function Campus(props) {
	const campuses = props.campuses;
	if (!campuses) return <Loading />;

	return (
		<div>
			{
				// map over our campses and display an image with the name of each campus with a link to the single view
				campuses.map(campus => {
					return (
						<div key={campus.id}>
							<Link to={`/campuses/${campus.id}`}><img src={campus.image} alt={campus.name} /></Link>
						</div>
					);
				})
			}
		</div>
	);
}

// Put campuses on the props
const mapStateToProps = state => ({ campuses: state.campuses });

export default connect(mapStateToProps)(Campus);
