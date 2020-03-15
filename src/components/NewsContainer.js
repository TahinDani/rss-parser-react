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
		console.log("COMPONENT DID MOUNT");
		this.getNews()
	}

	componentDidUpdate(prevProps){
		console.log("COMPONENT DID UPDATE");
		if (this.props.match.params.category !== prevProps.match.params.category) {
			console.log(this.props.match.params.category);
		}
	}

	getNews = async () => {
		console.log(this.props.match.params.category);
		
		/* let news = []
		for (let site of this.props.sites) {
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
		this.setState({news: news}) */
	}

	render() {
		if (['osszes', 'belfold', 'kulfold', 'gazdasag'].includes(this.props.match.params.category)) {
			return (
				<div>
					<h1>{this.props.match.params.category}</h1>
					{/* {this.state.news.map(n =>
						<News
						title={n.title}
						link={n.link}
						content={n.content}
						key= {n.id}
					/>
					)} */}
				</div>
			);
		} else {
			return(<h1>404 - NO SUCH PAGE</h1>)
		}
	}
}

export default NewsContainer;