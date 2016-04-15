import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import he from 'he'


/**
 * TODO: Display author link?
 */
export default class EntryMeta extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	renderDate() {
		const { date, date_formatted, modified, modified_formatted } = this.props

		return (
			<span className="posted-on">
				<Link to={ data.link } rel="bookmark">
					<time className="entry-date published" dateTime={ date }>{ date_formatted }</time>
					<time className="updated" dateTime={ modified }>{ modified_formatted }</time>
				</Link>
			</span>
		)
	}

	renderTerms( taxonomy ) {
		const terms = this.props.data[ taxonomy ]

		if ( ! terms || ! terms.length ) {
			return
		}

		return (
			<span className="tags-links">
				{ terms.map( term => {
					return (
						<span key={ term.id }>
							<Link to={ term.link } rel="tag">{ he.decode( term.name ) }</Link>
						</span>
					)
				} )}
			</span>
		)
	}

	/**
	 * TODO: Display media meta?
	 */
	render() {
		return (
			<div className="entry-meta">
				{ this.renderTerms( 'categories' ) }
				{ this.renderTerms( 'tags' ) }
			</div>
		)
	}
}
