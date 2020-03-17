import React, { Component } from 'react';
import '../style/News.css'

class News extends Component {
	
	render() {
		return (
			<div className='News'>
				<p>{this.props.newsItem.category} <strong>{this.props.newsItem.site}</strong> {this.props.newsItem.title}</p>
				<a href={this.props.newsItem.link}>{this.props.newsItem.content || "Link"}</a>
			</div>
		);
	}
}

export default News;