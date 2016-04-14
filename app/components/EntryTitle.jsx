import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { stripApiHost } from 'helpers.js'


const EntryTitle = props => {
	const title = { __html: props.title }

	if ( props.isSingle ) {
		return (
			<h1 className="entry-title" dangerouslySetInnerHTML={ title } />
		)
	} else {
		return (
			<h1 className="entry-title">
				<Link to={ stripApiHost( props.link ) } dangerouslySetInnerHTML={ title } />
			</h1>
		)
	}
}

EntryTitle.propTypes = {
	title: PropTypes.string.isRequired,
	isSingle: PropTypes.bool.isRequired
}

export default EntryTitle
