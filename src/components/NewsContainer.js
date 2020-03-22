import React, { Component } from 'react'

import News from './News'
import '../style/NewsContainer.css'

class NewsContainer extends Component {

	render() {
		if (this.props.news.length > 0) {
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
		} else {
			return <p className="NewsContainer-no_news">Jelenleg ezzel a szűréssel nincsenek hírek</p>
		}
	}
}

export default NewsContainer