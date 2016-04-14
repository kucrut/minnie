import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


/**
 * TODO: Display author link?
 */
class EntryMeta extends Component {
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
							<Link to={ term.link } rel="tag" dangerouslySetInnerHTML={{ __html: term.name }} />
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
		const { data } = this.props

		return (
			<div className="entry-meta">
				<span className="posted-on">
					<Link to={ data.link } rel="bookmark">
						<time className="entry-date published" dateTime={ data.date }>{ data.date_formatted }</time>
						<time className="updated" dateTime={ data.modified }>{ data.modified_formatted }</time>
					</Link>
				</span>
				{ this.renderTerms( 'categories' ) }
				{ this.renderTerms( 'tags' ) }
			</div>
		)
	}
}

EntryMeta.propTypes = {
	data: PropTypes.object.isRequired
}

export default EntryMeta
