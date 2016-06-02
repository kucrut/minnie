import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function LoadMoreButton( props ) {
	const { text, onClick, hasMore, isFetching } = props;

	if ( ! hasMore ) {
		return null;
	}

	const iconClass = classNames({
		genericon:            true,
		'animate-spin':       isFetching,
		'genericon-refresh':  isFetching,
		'genericon-download': ! isFetching
	});

	return (
		<div className="load-more">
			<a onClick={ onClick }><i className={ iconClass } aria-hidden="true" /> { text }</a>
		</div>
	);
}

LoadMoreButton.propTypes = {
	text:       PropTypes.string.isRequired,
	onClick:    PropTypes.func.isRequired,
	hasMore:    PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired
};
