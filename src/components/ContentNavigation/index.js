import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import he from 'he';

export default function ContentNavigation( props ) {
	const {
		isSingle,
		nextLink,
		nextText,
		prevLink,
		prevText,
	} = props;

	if ( ! prevLink && ! nextLink ) {
		return null;
	}

	let navClass;
	let navTitle;

	if ( isSingle ) {
		navClass = 'navigation post-navigation';
		navTitle = 'Post navigation';
	} else {
		navClass = 'navigation paging-navigation';
		navTitle = 'Posts navigation';
	}

	return (
		<nav className={ navClass } role="navigation">
			<h1 className="screen-reader-text">{ navTitle }</h1>
			<div className="nav-links">
				{ prevLink ? (
					<div className="nav-previous">
						<Link to={ prevLink }><span className="meta-nav">←</span> { he.decode( prevText ) }</Link>
					</div>
				) : null }
				{ nextLink ? (
					<div className="nav-next">
						<Link to={ nextLink }>{ he.decode( nextText ) } <span className="meta-nav">→</span></Link>
					</div>
				) : null }
			</div>
		</nav>
	);
}

ContentNavigation.propTypes = {
	isSingle: PropTypes.bool,
	prevLink: PropTypes.string,
	prevText: PropTypes.string,
	nextLink: PropTypes.string,
	nextText: PropTypes.string,
};

ContentNavigation.defaultProps = {
	isSingle: false,
	nextLink: '',
	nextText: 'Newer posts',
	prevLink: '',
	prevText: 'Older posts',
};
