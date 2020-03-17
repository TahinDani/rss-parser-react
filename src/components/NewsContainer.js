import React, { Component } from 'react';
import News from './News'

class NewsContainer extends Component {

	render() {
		if (['osszes', 'belfold', 'kulfold', 'gazdasag'].includes(this.props.match.params.category)) {
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
			);
		} else {
			return(<h1>404 - NO SUCH PAGE</h1>)
		}
	}
}

export default NewsContainer;