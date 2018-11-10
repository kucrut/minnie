import React from 'react';

import Content from '../../Content';

export default function Item( props ) {
	const { id, content } = props;

	return (
		<li key={ id }>
			<Content
				className="comment-content"
				content={ content.rendered }
			/>
		</li>
	);
}
