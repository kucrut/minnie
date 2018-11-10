import React from 'react';

import Content from '../../Content';

export default function Item( props ) {
	const { id, content, children_count } = props;

	return (
		<li key={ id }>
			<Content
				className="comment-content"
				content={ content.rendered }
			/>
			{ children_count > 0 ? (
				// TODO.
				<p>==> Has children</p>
			) : null }
		</li>
	);
}
