import React, { Component } from 'react';
import Parser from 'rss-parser'
import News from './News'

let parser = new Parser();

class NewsContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			news: []
		}
		this.sites = [
			{name: "index", url:"https://index.hu/24ora/rss/"},
			{name: "444", url:"https://cors-anywhere.herokuapp.com/https://444.hu/feed"},
			{name: "hvg", url:"https://cors-anywhere.herokuapp.com/https://hvg.hu/rss"},
			{name: "24.hu", url:"https://24.hu/feed/"},
		]
	}

	componentDidMount(){
		this.getNews()
	}

	getNews = async () => {
		let news = []
		for (let site of this.sites) {
			let feed = await parser.parseURL(site.url)
			console.log(feed);
			let feedItems = feed.items.map(item => ({
				id: item.link, 
				title: item.title, 
				link: item.link, 
				content: item.content.trim(),
				date: item.isoDate,
				categories: item.categories
			}))
			news = [...news, ...feedItems]
		}
		news.sort((a, b) => new Date(b.date) - new Date(a.date))
		console.log("sorted?");
		console.log(news);
		this.setState({news: news})
	}

	render() {
		return (
			<div>
				{this.state.news.map(n =>
					<News
						title={n.title}
						link={n.link}
						content={n.content}
						key= {n.id}
					/>
				)}
			</div>
		);
	}
}

export default NewsContainer;