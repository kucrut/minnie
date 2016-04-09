import React from 'react'
import { Link } from 'react-router'
import { stripApiHost } from 'helpers.js'


/**
 * TODO: Render the real url, title and text
 */
const EntryFormat = ({ format }) => {
	return (
		<div className="entry-format">
			<Link to="#"><span className="screen-reader-text">{ format }</span></Link>
		</div>
	)
}

export default EntryFormat
