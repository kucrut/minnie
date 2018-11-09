import React from 'react';
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom';

import Main from '../../containers/Main';
import NoContent from '../../components/NoContent';

const Oops = () => (
	<Main title="Oops!">
		<section className="error-404 not-found">
			<header className="page-header">
				<h1 className="page-title">Oops! That page can&rsquo;t be found.</h1>
			</header>

			<NoContent text="It looks like nothing was found at this location. Maybe try a search?" />
		</section>
	</Main>
);

const NotFoundWithRoute = ( { status, children } ) => (
	<Route
		render={ ( { staticContext } ) => {
			if ( staticContext ) {
				staticContext.status = status;
			}

			return children;
		} }
	/>
);

function NotFound( { status } ) {
	if ( status ) {
		return (
			<NotFoundWithRoute status={ status }>
				<Oops />
			</NotFoundWithRoute>
		);
	}

	return <Oops />;
}

export default hot( module )( NotFound );
