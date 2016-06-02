import React, { PropTypes } from 'react';
import Comment from 'components/Comment/Item';

export default function CommentsList({ listClass, items }) {
	let el = null;

	if ( items.length ) {
		el = (
			<ul className={ listClass }>
				{ items.map( comment => <Comment key={ `comment-${comment.id}` } comment={ comment } /> ) }
			</ul>
		);
	}

	return el;
}

CommentsList.propTypes = {
	listClass: PropTypes.string.isRequired,
	items:     PropTypes.arrayOf( PropTypes.object ).isRequired
};
