import React, { PropTypes } from 'react'


const EntryEmpty = ({ title, content }) => {
	return (
		<section className="error-404 not-found">
			<header className="page-header">
				<h1 className="page-title">{ title }</h1>
			</header>

			<div className="page-content">
				<p>{ content }</p>
				{ /* Render search form */ }
			</div>
		</section>
	)
}

EntryEmpty.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}

export default EntryEmpty
