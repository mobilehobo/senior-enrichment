import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';
import { submitCampus, removeCampus } from '../reducers';

class Campuses extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmitCampusData = this.handleSubmitCampusData.bind(this);
	}

	render() {
		const campuses = this.props.campuses;
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
								onClick={() => this.props.removeCampus(campus.id)}
							>Delete Campus</button>
							</div>
						);
					})
				}
				<hr />
				<form onSubmit={this.handleSubmitCampusData}>
					<label htmlFor="campusName">Campus Name</label>
					<input name="campusName" type="text" placeholder="Enter a campus name" />

					<label htmlFor="campusImage">Campus Image Url</label>
					<input name="campusImage" type="text" placeholder="Enter a campus image url" />

					<label htmlFor="submitCampusData">Submit New Campus</label>
					<input name="submitCampusData" type="submit" />
				</form>
			</div>
		);
	}

	handleSubmitCampusData(event) {
		event.preventDefault();
		const campus = {
			name: event.target.campusName.value,
			image: event.target.campusImage.value
		};
		this.props.submitCampus(campus);
	}
}

// Put campuses on the props
const mapStateToProps = state => ({ campuses: state.campuses });

const mapDispatchToProps = { submitCampus, removeCampus };

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
