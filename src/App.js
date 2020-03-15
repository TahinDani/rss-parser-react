import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Parser from 'rss-parser'
import './App.css';
import NewsContainer from './components/NewsContainer'
import Navbar from './components/Navbar'

let parser = new Parser();

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
			currentCategory: "",
			news: []
		}
	}

	componentDidMount(){
		console.log("COMPONENT DID MOUNT");
		this.getNews()
	}

	componentDidUpdate(prevProps, prevState){
		console.log("COMPONENT DID UPDATE");
		
		for (const i of this.state.sites){console.log(i.name, i.selected)}

		if (this.state.currentCategory !== prevState.currentCategory) {
			console.log("COMPONENT DID UPDATE CONDITION");
			
			console.log(this.state.currentCategory);
			this.getNews()
		}
	}

	handleSiteChange = (e) => {
		let clickedSite = e.target.name
		this.setState(st => ({
			sites: st.sites.map(s => s.name === clickedSite ? {...s, selected:!s.selected} : s)
		}), this.getNews )
	}

	handleCategoryChange = (category) => {
		this.setState({currentCategory: category})
	}

	getNews = async () => {
		let news = []
		for (let site of this.state.sites) {
			if (site.selected) {
				let feed = await parser.parseURL(site.url)
				console.log(feed);
				let feedItems = feed.items.map(item => ({
					site: feed.title,
					id: item.link, 
					title: item.title, 
					link: item.link, 
					content: item.content.trim(),
					date: item.isoDate,
					categories: item.categories
				}))
				news = [...news, ...feedItems]
			}
		}
		news.sort((a, b) => new Date(b.date) - new Date(a.date))
		console.log("sorted?");
		console.log(news);
		this.setState({news: news})
	}

	render(){
		return (
			<div className="App">
				<Navbar categories={this.props.categories} sources={this.state.sites} handleChange={this.handleSiteChange} onCategoryChange={this.handleCategoryChange}/>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/osszes" />}/>
					<Route exact path="/:category" render={(routeProps) => <NewsContainer {...routeProps} sites={this.state.sites} news={this.state.news}/>}/>
				</Switch>
			</div>
		);
	}
}

export default App;
