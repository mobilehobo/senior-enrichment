/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import { getAllCampuses } from '../reducers/campusReducer';
import { getAllStudents } from '../reducers/studentReducer';

class Routes extends Component {
	componentDidMount() {
		this.props.getAllCampuses();
		this.props.getAllStudents();
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/campuses" component={Campuses} />
					<Route path="/campuses/:id" component={SingleCampus} />
					<Route exact path="/students" component={Students} />
					<Route path="/students/:id" component={SingleStudent} />
				</Switch>
			</Router>);
	}
}

// don't need any props here for now
const mapStateToProps = null;

// import the thunks to get campuses and students on mount
const mapDispatchToProps = { getAllCampuses, getAllStudents };

export default connect(mapStateToProps, mapDispatchToProps)(Routes); // export our Container
