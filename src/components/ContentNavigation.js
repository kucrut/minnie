import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import he from 'he';

export default class ContentNavigation extends Component {
	static propTypes = {
		isSingle: PropTypes.bool,
		prevLink: PropTypes.string,
		prevText: PropTypes.string,
		nextLink: PropTypes.string,
		nextText: PropTypes.string,
	}

	renderPrevLink() {
		const { prevLink, prevText } = this.props;
		const text = prevText || 'Older posts';
		let el;

		if ( prevLink ) {
			el = (
				<div className="nav-previous">
					<Link to={ prevLink }><span className="meta-nav">←</span> { he.decode( text ) }</Link>
				</div>
			);
		}

		return el;
	}

	renderNextLink() {
		const { nextLink, nextText } = this.props;
		const text = nextText || 'Newer posts';
		let el;

		if ( nextLink ) {
			el = (
				<div className="nav-next">
					<Link to={ nextLink }>{ he.decode( text ) } <span className="meta-nav">→</span></Link>
				</div>
			);
		}

		return el;
	}

	render() {
		const { isSingle, prevLink, nextLink } = this.props;
		let navClass;
		let navTitle;
		let el;

		if ( isSingle ) {
			navClass = 'navigation post-navigation';
			navTitle = 'Post navigation';
		} else {
			navClass = 'navigation paging-navigation';
			navTitle = 'Posts navigation';
		}

		if ( prevLink || nextLink ) {
			el = (
				<nav className={ navClass } role="navigation">
					<h1 className="screen-reader-text">{ navTitle }</h1>
					<div className="nav-links">
						{ this.renderPrevLink() }
						{ this.renderNextLink() }
					</div>
				</nav>
			);
		}

		return el;
	}
}
