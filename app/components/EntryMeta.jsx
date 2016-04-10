import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import he from 'he'
import { getTheDate, stripApiHost } from 'helpers.js'


/**
 * TODO: Display author link?
 */
class EntryMeta extends Component {
	renderTerms( taxonomy ) {
		const { minnie_terms } = this.props.data

		if ( ! minnie_terms || ! minnie_terms[ taxonomy ].length ) {
			return
		}

		return (
			<span className="tags-links">
				{ minnie_terms[ taxonomy ].map( term => {
					return ( <Link to={ stripApiHost( term.link ) } key={ term.id } rel="tag">{ he.decode( term.name ) }</Link> )
				} )}
			</span>
		)
	}

	render() {
		const { data } = this.props

		return (
			<div className="entry-meta">
				<span className="posted-on">
					<Link to={ stripApiHost( data.link ) } rel="bookmark">
						<time className="entry-date published" dateTime={ data.date }>{ getTheDate( data.date ) }</time>
						<time className="updated" dateTime={ data.modified }>{ getTheDate( data.modified ) }</time>
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
