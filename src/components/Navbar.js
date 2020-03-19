import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import deburr from 'lodash.deburr'
import '../style/Navbar.css'

class Navbar extends Component {
	render() {
		return (
			<div> 
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container">

						<h2 className="navbar-brand">MINDex</h2>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								{this.props.categories.map(c =>
								
									<Link 
										className="nav-item nav-link"
										key={c}
										exact="true"
										to={deburr(c).toLowerCase()}
										onClick={() => this.props.onCategoryChange(deburr(c).toLowerCase())}>{c}
									</Link>
								
								)}
								{this.props.sources.map(s =>
										
									<div key={s.name} className="nav-item nav-link">
										<input type="checkbox"
											checked={s.selected}
											onChange={this.props.handleChange}
											id={s.name} name={s.name}
											value={s.name}
											disabled={this.props.isLoading}>
										</input>
										<label htmlFor={s.name}>{s.name}</label>
									</div>
										
								)}

							</div>
						</div>
					</div>
				</nav>
			</div> 
		)
	}
}

export default Navbar