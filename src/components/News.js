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
			<div className="News card">
				<div className="row no-gutters" style={{backgroundColor:siteBackgroundColor}}>
					{/*  */}
					<div className={"News-image col-md-4 " + (imageUrl ? "" : "d-none") + " d-md-block"} style={{backgroundImage: `url(${imageUrl})`}}>
						<div className="News-category">{this.props.newsItem.category}</div>
					</div>
					<div className={"col-md-4 " + (imageUrl ? "d-none" : "d-block") + " d-md-none"} >
						<div className="News-category">{this.props.newsItem.category}</div>
					</div>
					<div className="col-md-8" >
						<div className="News-text card-body">
							<p className="News-title">{this.props.newsItem.title}</p>
							<a className="News-content" href={this.props.newsItem.link}>{this.props.newsItem.content || 'Link'}</a>
							<p className="News-date card-text"><small>{new Date(this.props.newsItem.date).toLocaleString('hu-HU')}</small></p>
						</div>
					</div>
				</div>
			</div>	
		)
	}
}

export default News