import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div>
			<Link to="/campuses">All Campuses</Link>
			<Link to="/students">All Students</Link>
		</div>
	);
}
