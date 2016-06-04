import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function CommentAuthor({ authorName, authorUrl }) {
	let el = ( <b className="fn">{ authorName }</b> );

	if ( '' !== authorUrl ) {
		if ( 0 === authorUrl.indexOf( '/' ) ) {
			el = ( <Link to={ authorUrl }>{ el }</Link> );
		} else {
			el = ( <a href={ authorUrl } rel="external nofollow">{ el }</a> );
		}
	}

	return el;
}

CommentAuthor.propTypes = {
	authorUrl:  PropTypes.string.isRequired,
	authorName: PropTypes.string.isRequired
};
