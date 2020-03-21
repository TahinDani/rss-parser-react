import React, { Component } from 'react'

import News from './News'
import '../style/NewsContainer.css'

class NewsContainer extends Component {

	render() {
		return (
			<div className="NewsContainer">
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

export default NewsContainer