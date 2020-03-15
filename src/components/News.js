import React, { Component } from 'react';

class News extends Component {
	
	render() {
		return (
			<div>
				<h1>{this.props.site + ' ' + this.props.title}</h1>
				<a href={this.props.link}>{this.props.content || "Link"}</a>
			</div>
		);
	}
}

export default News;