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
	}

	componentDidMount(){
		this.getNews()
	}
	
	getNews = async (url) => {
		const feed = await parser.parseURL('https://index.hu/24ora/rss/')
		console.log(feed);
		let news = feed.items.map(item => ({id: item.guid, title: item.title, link: item.link, content: item.content})) // TODO: filter different categories
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