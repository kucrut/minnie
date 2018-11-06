import React from 'react';
import he from 'he';

import Main from '../Main';
import NotFound from '../../pages/404';
import Spinner from '../../components/Spinner';

export default function Singular( props ) {
	const { info, singular, children } = props;
	const { data, isFetching } = singular;
	let title;

	if ( isFetching ) {
		return <Spinner />;
	}

	if ( ! data.id ) {
		return <NotFound />;
	}

	title = data.title.rendered ? data.title.rendered : data.title.from_content;
	title = he.decode( title );

	return (
		<Main title={ title } titleTemplate={ `%s | ${info.name}` }>
			{ children }
		</Main>
	);
}
