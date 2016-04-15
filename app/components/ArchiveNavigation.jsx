import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class ArchiveNavigation extends Component {
	static propTypes = {
		prevLink: PropTypes.string,
		nextLink: PropTypes.string
	}

	renderPrevLink() {
		const { prevLink } = this.props

		if ( prevLink ) {
			return (
				<div className="nav-previous">
					<Link to={ prevLink }><span className="meta-nav">←</span> Older posts</Link>
				</div>
			)
		}
	}


	renderNextLink() {
		const { nextLink } = this.props

		if ( nextLink ) {
			return (
				<div className="nav-next">
					<Link to={ nextLink }>Newer posts <span className="meta-nav">→</span></Link>
				</div>
			)
		}
	}

	render() {
		const { prevLink, nextLink } = this.props

		if ( prevLink || nextLink ) {
			return (
				<nav className="navigation paging-navigation" role="navigation">
					<h1 className="screen-reader-text">Posts navigation</h1>
					<div className="nav-links">
						{ this.renderPrevLink() }
						{ this.renderNextLink() }
					</div>
				</nav>
			)
		}
	}
}
