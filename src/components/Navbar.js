import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deburr from 'lodash.deburr'
import '../style/Navbar.css'

class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				<h2 className="Navbar-title">MINDex</h2>
				{this.props.categories.map(c =>
					<Link 
						key={c}
						exact="true"
						to={deburr(c).toLowerCase()}
						onClick={() => this.props.onCategoryChange(deburr(c).toLowerCase())}>{c}
					</Link>
				)}
				{this.props.sources.map(s =>
					<div key={s.name}>
						<input type="checkbox" checked={s.selected} onChange={this.props.handleChange} id={s.name} name={s.name} value={s.name} disabled={this.props.isLoading}></input>
						<label htmlFor={s.name}>{s.name}</label>
					</div>
				)}
			</div>
		);
	}
}

export default Navbar;