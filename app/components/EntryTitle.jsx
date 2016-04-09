import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { stripApiHost } from 'helpers.js'


const EntryTitle = props => {
	if ( props.isSingle ) {
		return (
			<h1 className="entry-title">{ props.title }</h1>
		)
	} else {
		return (
			<h1 className="entry-title">
				<Link to={ stripApiHost( props.link ) }>{ props.title }</Link>
			</h1>
		)
	}
}

EntryTitle.propTypes = {
	title: PropTypes.string.isRequired,
	isSingle: PropTypes.bool.isRequired
}

export default EntryTitle
