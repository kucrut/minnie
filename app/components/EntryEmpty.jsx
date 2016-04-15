import React, { Component, PropTypes } from 'react'


export default class EntryEmpty extends Component {
	render() {
		const { title, content } = this.props

		return (
			<section className="error-404 not-found">
				<header className="page-header">
					<h1 className="page-title">{ title }</h1>
				</header>

				<div className="page-content">
					<p>{ content }</p>
					{ /* Render search form */ }
				</div>
			</section>
		)
	}
}
