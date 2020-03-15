import React, { Component } from 'react';
import News from './News'

class NewsContainer extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		if (['osszes', 'belfold', 'kulfold', 'gazdasag'].includes(this.props.match.params.category)) {
			return (
				<div>
					<h1>{this.props.match.params.category}</h1>
					{this.props.news.map(n =>
						<News
						site={n.site}
						title={n.title}
						link={n.link}
						content={n.content}
						key= {n.id}
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