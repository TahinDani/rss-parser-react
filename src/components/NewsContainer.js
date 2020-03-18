import React, { Component } from 'react';

import News from './News'

class NewsContainer extends Component {

	render() {
			return (
				<div>
					<h1>{this.props.match.params.category}</h1>
					{this.props.news.map(n =>
						<News
						newsItem={n}
						key={n.link}
					/>
					)}
				</div>
			)
	}
}

export default NewsContainer;