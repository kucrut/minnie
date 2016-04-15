import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import he from 'he'


export default class EntryTitle extends Component {
	static propTypes = {
		link: PropTypes.string,
		title: PropTypes.string.isRequired,
		isSingle: PropTypes.bool.isRequired
	}

	render() {
		const { isSingle, link, title } = this.props
		let _title = he.decode( title )

		if ( isSingle ) {
			return (
				<h1 className="entry-title">{ _title }</h1>
			)
		} else {
			return (
				<h1 className="entry-title">
					<Link to={ link }>{ _title }</Link>
				</h1>
			)
		}
	}
}
