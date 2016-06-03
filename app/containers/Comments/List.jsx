import React, { PropTypes } from 'react';
import Comment from 'components/Comment/Item';

// TODO: Wrap list and append load more button.
export default function CommentsList( props ) {
	const { listClass, threadId, comments, ...rest } = props;
	const thread = comments.threads[ threadId ];

	if ( ! thread.items.length ) {
		return null;
	}

	return (
		<ol className={ listClass }>
			{ thread.items.map( comment => {
				const args = {
					key: `comment-${comment.id}`,
					comment,
					...rest
				};

				return ( <Comment { ...args } /> );
			}) }
		</ol>
	);
}

CommentsList.propTypes = {
	comments:           PropTypes.object.isRequired,
	threadId:           PropTypes.string.isRequired,
	listClass:          PropTypes.string.isRequired,
	onClickReply:       PropTypes.func.isRequired,
	onClickViewReplies: PropTypes.func.isRequired
};
