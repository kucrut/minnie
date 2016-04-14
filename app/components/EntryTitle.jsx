import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class EntryTitle extends Component {
	static propTypes = {
		link: PropTypes.string,
		title: PropTypes.string.isRequired,
		isSingle: PropTypes.bool.isRequired
	}

	render() {
		const { isSingle, link } = this.props
		const title = { __html: this.props.title }

		if ( isSingle ) {
			return (
				<h1 className="entry-title" dangerouslySetInnerHTML={ title } />
			)
		} else {
			return (
				<h1 className="entry-title">
					<Link to={ link } dangerouslySetInnerHTML={ title } />
				</h1>
			)
		}
	}
}
