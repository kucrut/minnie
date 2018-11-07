import React from 'react';
import { hot } from 'react-hot-loader'
import Main from '../../containers/Main';
import NoContent from '../../components/NoContent';

function NotFound() {
	return (
		<Main title="Oops!">
			<section className="error-404 not-found">
				<header className="page-header">
					<h1 className="page-title">Oops! That page can&rsquo;t be found.</h1>
				</header>

				<NoContent text="It looks like nothing was found at this location. Maybe try a search?" />
			</section>
		</Main>
	);
}

export default hot( module )( NotFound );
