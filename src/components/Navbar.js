import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<div>
				<h2>Navbar</h2>
				<Link exact to="/belfold">Belföld</Link>
			</div>
		);
	}
}

export default Navbar;