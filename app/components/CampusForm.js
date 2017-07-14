import React from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import { submitCampus } from '../reducers';

class CampusForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmitCampusData = this.handleSubmitCampusData.bind(this);
	}

	render() {
		let campus = this.props.campus;
		if (this.props.create) campus = { name: '', image: '' }; // if we're creating a campus and not just updating info
		if (!campus) return <Loading />; // if stuff is still loading, to prevent errors with accessing properties of undefined

		return (
			<div>
				<hr />
				<form onSubmit={this.handleSubmitCampusData}>
					<label htmlFor="campusName">Campus Name</label>
					<input name="campusName" type="text" placeholder="Enter a campus name" defaultValue={campus.name} />

					<label htmlFor="campusImage">Campus Image Url</label>
					<input name="campusImage" type="text" placeholder="Enter a campus image url" defaultValue={campus.image} />

					<label htmlFor="submitCampusData">Submit New Campus</label>
					<input name="submitCampusData" type="submit" />
				</form>
			</div>
		);
	}

	handleSubmitCampusData(event) {
		event.preventDefault();
		let name = event.target.campusName.value;
		let image = event.target.campusImage.value;
		const campus = {
			name,
			image
		};
		let id;
		if (this.props.create) id = null;
		else id = this.props.campus.id;

		this.props.submitCampus(id, campus); // pass in null if we're creating a campus
		if (!this.props.create) {
			event.target.campusName.value = '';
			event.target.campusImage.value = '';
		}
	}
}

const mapStateToProps = state => ({ campuses: state.campuses });

const mapDispatchToProps = { submitCampus };

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
