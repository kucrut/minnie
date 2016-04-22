import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import he from 'he'


export default class ArchiveNavigation extends Component {
	static propTypes = {
		isSingle: PropTypes.bool,
		prevLink: PropTypes.string,
		prevText: PropTypes.string,
		nextLink: PropTypes.string,
		nextText: PropTypes.string
	}

	renderPrevLink() {
		const { prevLink, prevText } = this.props
		let text = prevText ? prevText : 'Older posts'

		if ( prevLink ) {
			return (
				<div className="nav-previous">
					<Link to={ prevLink }><span className="meta-nav">←</span> { he.decode( text ) }</Link>
				</div>
			)
		}
	}


	renderNextLink() {
		const { nextLink, nextText } = this.props
		let text = nextText ? nextText : 'Newer posts'

		if ( nextLink ) {
			return (
				<div className="nav-next">
					<Link to={ nextLink }>{ he.decode( text ) } <span className="meta-nav">→</span></Link>
				</div>
			)
		}
	}

	render() {
		const { isSingle, prevLink, nextLink } = this.props
		let navClass, navTitle

		if ( isSingle ) {
			navClass = 'navigation post-navigation'
			navTitle = 'Post navigation'
		} else {
			navClass = 'navigation paging-navigation'
			navTitle = 'Posts navigation'
		}

		if ( prevLink || nextLink ) {
			return (
				<nav className={ navClass } role="navigation">
					<h1 className="screen-reader-text">{ navTitle }</h1>
					<div className="nav-links">
						{ this.renderPrevLink() }
						{ this.renderNextLink() }
					</div>
				</nav>
			)
		}
	}
}
