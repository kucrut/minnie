import React from 'react';

import Content from '../../Content';

export default function Item( props ) {
	const { content, children_count } = props;

	return (
		<li>
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
