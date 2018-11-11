import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../LinkButton';

export default function Meta( props ) {
	const {
		comment,
		onClickViewReplies,
		showReplies,
	} = props;
	const {
		children_count,
		date,
		date_formatted,
		link,
	} = comment;

	return (
		<div className="comment-metadata">
			<a href={ link }>
				<time dateTime={ date }>{ date_formatted }</time>
			</a>
			{ ( children_count > 0 && ! showReplies ) ? (
				<LinkButton
					className="comment-view-replies-button"
					onClick={ onClickViewReplies }
				>
					View replies
				</LinkButton>
			) : null }
		</div>
	);
}

Meta.propTypes = {
	comment: PropTypes.object.isRequired,
	onClickViewReplies: PropTypes.func.isRequired,
	showReplies: PropTypes.bool.isRequired,
};
