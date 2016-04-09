import React, { PropTypes } from 'react'

const EntryTitle = ({ title }) => <h1 className="entry-title">{ title }</h1>

EntryTitle.propTypes = {
	title: PropTypes.string.isRequired
}

export default EntryTitle
