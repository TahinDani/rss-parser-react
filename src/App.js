import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NewsContainer from './components/NewsContainer'
import Navbar from './components/Navbar'

class App extends Component {
	static defaultProps = {
		categories: ["Összes", "Belföld", "Külföld", "Gazdaság"],
	}

	constructor(props) {
		super(props);
		this.state = {
			sites: [
				{name: "index", url:"https://index.hu/24ora/rss/", selected:true},
				{name: "444", url:"https://cors-anywhere.herokuapp.com/https://444.hu/feed", selected:true},
				{name: "hvg", url:"https://cors-anywhere.herokuapp.com/https://hvg.hu/rss", selected:true},
				{name: "24.hu", url:"https://24.hu/feed/", selected:false},
			],
			currentCategory: this.props.categories[0],
			news: []
		}
	}

	handleChange = (e) => {
		let clickedSite = e.target.name
		this.setState(st => ({
			sites: st.sites.map(s => s.name === clickedSite ? {...s, selected:!s.selected} : s)
		}))
		
	}

	render(){
		return (
			<div className="App">
				<Navbar categories={this.props.categories} sources={this.state.sites} handleChange={this.handleChange}/>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/osszes" />}/>
					<Route exact path="/:category" render={(routeProps) => <NewsContainer {...routeProps} sites={this.state.sites}/>}/>
				</Switch>
			</div>
		);
	}
}

export default App;
