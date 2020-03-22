import React, { Component } from 'react'
import '../style/News.css'

class News extends Component {
	
	/* 
	index #f69220 
	hvg #e25900
	444 #feff73
	24.hu #63667a
	*/

	getBackgroundColor = (site) => {
		switch (site) {
			case "Index - 24óra":
				return "#f69220"
			case "444":
				return "#feff73"
			case "hvg.hu RSS":
				return "#e25900"
			case "24.hu":
				return "#63667a"
			default:
				return "#a0a0a0"
		}
	}
	
	render() {
		const imageUrl = this.props.newsItem.imageUrl
		const siteBackgroundColor = this.getBackgroundColor(this.props.newsItem.site)
		return (
			<div className='News d-flex' style={{backgroundColor:siteBackgroundColor}}>
				
				<div className="News-image" style={{backgroundImage: `url(${imageUrl})`}}>
					<div className="News-category">{this.props.newsItem.category}</div>
				</div> 
				
				<div className="News-text">
					<p className="News-title">{this.props.newsItem.title}</p>
					<a href={this.props.newsItem.link}>{this.props.newsItem.content || 'Link'}</a>
				</div>
			</div>
		)
	}
}

export default News