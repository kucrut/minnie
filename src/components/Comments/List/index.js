import React from 'react';

import Item from '../Item';

export default function List( props ) {
	const { className, items, ...rest } = props;

	return (
		<ol className={ `comment-list ${ className }` }>
			{ items.map( comment => (
				<Item
					key={ comment.id }
					comment={ comment }
					{ ...rest }
				/>
			) ) }
		</ol>
	);
}
