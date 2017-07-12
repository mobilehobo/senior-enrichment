import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Home from './Home';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import { getAllCampuses } from '../reducers/campusReducer';

class Routes extends Component {
	componentDidMount() {
		this.props.getAllCampuses();
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
					<Route path="/campuses" component={Campuses} />
					</Switch>
				</div>
			</Router>);
	}
}

//<Route path="/" component={Home} />
//<Route path="/campuses/:id" Component={SingleCampus} />

const mapStateToProps = null;
// import the thunk to get campuses on mount
const mapDispatchToProps = { getAllCampuses };

export default connect(mapStateToProps, mapDispatchToProps)(Routes); // export our RoutesContainer
