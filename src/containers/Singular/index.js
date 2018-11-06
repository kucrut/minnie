import React from 'react';
import he from 'he';
import Helmet from 'react-helmet';

import NotFound from '../../pages/404';
import Entry from '../../components/Entry/Item';
import Spinner from '../../components/Spinner';

export default function Singular( props ) {
	const { info, singular, children } = props;
	const { data, isFetching } = singular;
	let title;

	if ( isFetching ) {
		return ( <Spinner /> );
	}

	if ( ! data.id ) {
		return ( <NotFound /> );
	}

	title = data.title.rendered ? data.title.rendered : data.title.from_content;
	title = he.decode( title );

	return (
		<div className="content">
			<Helmet
				title={ title }
				titleTemplate={ `%s | ${info.name}` }
			/>

			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">
					<Entry data={ data } isSingle={ true } />
					{ children }
				</main>
			</div>
		</div>
	);
}
