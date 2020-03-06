import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/Navbar.css'

class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				<h2 className="Navbar-title">MINDex</h2>
				<Link exact to="/">Összes</Link>
				<Link exact to="/belfold">Belföld</Link>
				<Link exact to="/kulfold">Külföld</Link>
				<Link exact to="/gazdasag">Gazdaság</Link>
			</div>
		);
	}
}

export default Navbar;