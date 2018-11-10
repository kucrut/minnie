import React from 'react';

import Item from '../Item';

export default function List( props ) {
	const { items } = props;

	return (
		<ol className="comment-list">
			{ items.map( comment => <Item key={ comment.id } comment={ comment } /> ) }
		</ol>
	);
}
