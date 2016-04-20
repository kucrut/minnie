import React, { Component, PropTypes } from 'react'
import SearchForm from 'components/SearchForm'


export default class EntryEmpty extends Component {
	static propTypes = {
		title: PropTypes.string,
		content: PropTypes.string.isRequired
	}

	renderContent() {
		return (
			<div className="page-content">
				<p>{ this.props.content }</p>
				<SearchForm />
			</div>
		)
	}

	render() {
		const { title } = this.props

		if ( ! title ) {
			return this.renderContent()
		}

		return (
			<section className="error-404 not-found">
				<header className="page-header">
					<h1 className="page-title">{ title }</h1>
				</header>

				{ this.renderContent() }
			</section>
		)
	}
}
