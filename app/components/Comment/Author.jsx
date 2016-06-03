import React, { PropTypes } from 'react';

export default function CommentAuthor({ authorName, authorUrl }) {
	let el = ( <b className="fn">{ authorName }</b> );

	if ( '' !== authorUrl ) {
		el = ( <a href={ authorUrl } rel="external nofollow">{ el }</a> );
	}

	return el;
}

CommentAuthor.propTypes = {
	authorUrl:  PropTypes.string.isRequired,
	authorName: PropTypes.string.isRequired
};
