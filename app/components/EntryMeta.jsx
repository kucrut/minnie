import React from 'react'
import { Link } from 'react-router'
import { getTheDate, stripApiHost } from 'helpers.js'


/**
 * TODO: Display author link.
 */
const EntryMeta = ({ data }) => {
	return (
		<div className="entry-meta">
			<span className="posted-on">
				<Link to={ stripApiHost( data.link ) } rel="bookmark">
					<time className="entry-date published" dateTime={ data.date }>{ getTheDate( data.date ) }</time>
					<time className="updated" dateTime={ data.modified }>{ getTheDate( data.modified ) }</time>
				</Link>
			</span>
		</div>
	)
}

export default EntryMeta
