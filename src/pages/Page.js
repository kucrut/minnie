import React from 'react';
import he from 'he';
import Helmet from 'react-helmet';

import withSingular from '../hoc/with-singular';
import NotFound from './404';
import Spinner from '../components/Spinner';
import Entry from '../components/Entry/Item';

import { fetchPage } from '../store/actions/singular';

function Page( props ) {
	const { info, singular } = props;
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
					{/* TODO: Navigation */}
				</main>
			</div>
		</div>
	);
}

const fetchData = props => {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPage( args ) );
}

export default withSingular( {
	fetchData,
	need: [ fetchPage ],
} )( Page );
