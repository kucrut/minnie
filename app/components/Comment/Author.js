import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CommentAuthor( { authorName, authorUrl } ) {
	let el = ( <b className="fn">{ authorName }</b> );

	if ( authorUrl !== '' ) {
		if ( authorUrl.indexOf( '/' ) === 0 ) {
			el = ( <Link to={ authorUrl }>{ el }</Link> );
		} else {
			el = ( <a href={ authorUrl } rel="external nofollow">{ el }</a> );
		}
	}

	return el;
}

CommentAuthor.propTypes = {
	authorUrl: PropTypes.string.isRequired,
	authorName: PropTypes.string.isRequired,
};
