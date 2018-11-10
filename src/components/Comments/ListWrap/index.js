import React from 'react';

export default function List( props ) {
	const { createItem, items } = props;

	return (
		<ol className="comment-list">
			{ items.map( comment => createItem( comment ) ) }
		</ol>
	);
}
