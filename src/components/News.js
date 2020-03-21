import React, { Component } from 'react'
import '../style/News.css'

class News extends Component {
	
	render() {
		let imageUrl = this.props.newsItem.imageUrl
		return (
			<div className='News d-flex'>
				
				<div className="News-image" style={{backgroundImage: `url(${imageUrl})`}}>
					<div className="News-category">{this.props.newsItem.category}</div>
				</div> 
				
				<div className="News-text">
					<p><strong>{this.props.newsItem.site}</strong> {this.props.newsItem.title}</p>
					<a href={this.props.newsItem.link}>{this.props.newsItem.content || 'Link'}</a>
				</div>
			</div>
		)
	}
}

export default News