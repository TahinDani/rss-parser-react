import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import deburr from 'lodash.deburr'
import '../style/Navbar.css'

class Navbar extends Component {
	render() {
		return (
			
			<nav className="Navbar navbar fixed-top navbar-expand-md navbar-light">
				<div className="container">

					<h2 className="navbar-brand">MINDex</h2>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							{this.props.categories.map(c =>
								
								<NavLink 
									className="nav-item nav-link"
									activeClassName="Navbar-selected-category"
									key={c}
									exact="true"
									to={deburr(c).toLowerCase()}
									onClick={() => this.props.onCategoryChange(deburr(c).toLowerCase())}>{c}
								</NavLink>
								
							)}
							{this.props.sources.map(s =>
								
								<div key={s.name} className="Navbar-site">
									<div className="nav-item nav-link custom-control custom-checkbox">
										<input type="checkbox"
											className="Navbar-checkbox custom-control-input"
											checked={s.selected}
											onChange={this.props.handleChange}
											id={s.name} 
											name={s.name}
											value={s.name}
											disabled={this.props.isLoading}>
										</input>
										<label className={`Navbar-label-for-${s.name} custom-control-label`} htmlFor={s.name}>{s.name}</label>
									</div> 
								</div>

							)}

						</div>
					</div>
				</div>
			</nav>
			
		)
	}
}

export default Navbar