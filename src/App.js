import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Parser from 'rss-parser'
import deburr from 'lodash.deburr'
import './App.css'
import NewsContainer from './components/NewsContainer'
import Navbar from './components/Navbar'
import Fof from './components/Fof'

let parser = new Parser()

class App extends Component {
	static defaultProps = {
		categories: ["Összes", "Belföld", "Külföld", "Gazdaság"],
	}

	constructor(props) {
		super(props)
		this.state = {
			sites: this.getInitialSites(),
			currentCategory: this.getInitialCategory(),
			news: [],
			loading: false,
		}
	}

	getInitialCategory =() => {
		let selectedCategory = localStorage.getItem( 'selectedCategory' ) || "osszes"
		return selectedCategory
	}

	getInitialSites = () => {
		let sites = [
			{name: "index", url:"https://index.hu/24ora/rss/", selected:true},
			{name: "444", url:"https://cors-anywhere.herokuapp.com/https://444.hu/feed", selected:true},
			{name: "hvg", url:"https://cors-anywhere.herokuapp.com/https://hvg.hu/rss", selected:false},
			{name: "24", url:"https://24.hu/feed/", selected:false},
		]
		let localSelectedSites = localStorage.getItem("sites") || sites.map(s => s.name)
		localStorage.setItem("sites", localSelectedSites)
		return sites.map(s => ({...s, selected:localSelectedSites.includes(s.name)}))
	}

	componentDidMount(){
		if (['osszes', 'belfold', 'kulfold', 'gazdasag'].includes(this.props.location.pathname.slice(1))) { // TODO: there's need to be a better way
			this.setState({loading: true}, this.getNews)
		} else {
			this.setState({currentCategory: undefined})
		}
	}

	componentDidUpdate(){
		// need to handle category change from undefined to 'osszes' when redirected from '/' to '/osszes'
		if (this.state.currentCategory === undefined && 
			this.props.location.pathname.slice(1) === 'osszes') {
				this.handleCategoryChange('osszes')	
			}
	}

	handleSiteChange = (e) => {
		let clickedSite = e.target.name
		this.handleLocalStorageSites(clickedSite)
		this.setState(st => ({
			loading: true,
			sites: st.sites.map(s => s.name === clickedSite ? {...s, selected:!s.selected} : s)
		}), this.getNews )
	}

	handleLocalStorageSites = (site) => {
		let localSites = localStorage.getItem("sites") || ""
		if (localSites.includes(site)) {
			let newSites = localSites.split(',').filter(s => s !== site)
			localStorage.setItem("sites", newSites)
		} else {
			let newSites = [localSites, site]
			localStorage.setItem("sites", newSites)
		}
	}
	
	handleCategoryChange = (category) => {
		localStorage.setItem('selectedCategory', category)
		if (this.state.currentCategory !== category) {
			this.setState({loading: true, currentCategory: category}, this.getNews)
			}
		}
	
	get444caterory = (feedItem) => {
		if (feedItem.categories.includes('külföld')){
			return 'kulfold'
		} else if (feedItem.categories.includes('gazdaság')){
			return 'gazdasag'
		} else {
			return 'belfold'
		}	
	}

	getHvgCategory = (feedItem) => {
		let category = feedItem.link.split("/")[3]
		switch (category) {
			case 'itthon':
			case 'cegauto':
				return 'belfold'
			case 'vilag':
				return 'kulfold'
			case 'gazdasag':
			case 'kkv':
				return 'gazdasag'
			default:
				return category
		}
	}

	get24huCategory = (feedItem) => {
		let category = deburr(feedItem.categories[0]).toLowerCase()
		return category === 'nagyvilag' ? 'kulfold' : category
	}

	getCategory = (site, feedItem) => {
		const lowercaseSite = site.toLowerCase()
		if (lowercaseSite.includes("index")) {
			return feedItem.link.split("/")[3]
		} else if (lowercaseSite.includes("444")) {
			return this.get444caterory(feedItem)
		} else if (lowercaseSite.includes("hvg")) {
			return this.getHvgCategory(feedItem)
		} else if (lowercaseSite.includes("24.hu")) {
			return this.get24huCategory(feedItem)
		}
	}

	getNews = async () => {
		let news = []
		for (let site of this.state.sites) {
			if (site.selected) {
				let feed = await parser.parseURL(site.url)
				console.log(feed)
				let feedItems = feed.items.map(item => ({
					site: feed.title,
					id: item.link, 
					title: item.title, 
					link: item.link, 
					content: feed.title === "444" ? item.contentSnippet : item.content.trim(),
					date: item.isoDate,
					category: this.getCategory(feed.title, item),
					imageUrl: !(feed.title === "hvg.hu RSS") && item.enclosure?.url, // don't need hvg images because of shitty quality
				}))
				// TODO: it's not really optimal, can this be filtered earlier?
				if (this.state.currentCategory !== 'osszes') {
					feedItems = feedItems.filter(item => item.category === this.state.currentCategory)
				}
				news = [...news, ...feedItems]
			}
		}
		news.sort((a, b) => new Date(b.date) - new Date(a.date))
		console.log(news)
		this.setState({news: news, loading: false})
	}

	render(){
		return (
			<div className="App">
				<Navbar 
					categories={this.props.categories}
					sources={this.state.sites}
					handleChange={this.handleSiteChange}
					onCategoryChange={this.handleCategoryChange}
					isLoading={this.state.loading}
				/>
				<div className="container">
					<Switch>
						<Route exact path="/:category" render={(routeProps) => {
							if (!this.state.currentCategory) {
								return <Fof />
							} else if (this.state.loading) {
								return (
								<div class="spinner-border" role="status" style={{marginTop: 100}}>
									<span className="sr-only">Loading...</span>
								</div>
								)
							} else {
								return <NewsContainer {...routeProps} news={this.state.news}/>
							}
						}}/>
						<Redirect from='/' to='/osszes' />
					</Switch>
				</div>
			</div>
		)
	}
}

export default withRouter(App)
