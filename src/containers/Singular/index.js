import React from 'react';
import he from 'he';

import Main from '../Main';

export default function Singular( props ) {
	const { info, singular, children } = props;
	const { data } = singular;
	let title;

	title = data.title.rendered ? data.title.rendered : data.title.from_content;
	title = he.decode( title );

	return (
		<Main title={ title } titleTemplate={ `%s | ${info.name}` }>
			{ children }
		</Main>
	);
}
