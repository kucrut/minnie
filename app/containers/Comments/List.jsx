import React, { PropTypes } from 'react';
import Comment from 'components/Comment/Item';

export default function CommentsList( props ) {
	const { listClass, items, ...rest } = props;

	if ( ! items.length ) {
		return null;
	}

	return (
		<ul className={ listClass }>
			{ items.map( comment => {
				const args = {
					key: `comment-${comment.id}`,
					comment,
					...rest
				};

				return ( <Comment { ...args } /> );
			}) }
		</ul>
	);
}

CommentsList.propTypes = {
	items:              PropTypes.arrayOf( PropTypes.object ).isRequired,
	listClass:          PropTypes.string.isRequired,
	onClickReply:       PropTypes.func.isRequired,
	onClickViewReplies: PropTypes.func.isRequired
};
