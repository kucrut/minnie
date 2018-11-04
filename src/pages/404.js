import React from 'react';
import Helmet from 'react-helmet';

import EntryEmpty from '../components/Entry/Empty';

export default function NotFound() {
	return (
		<div className="content">
			<Helmet title="Oops!" />

			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">
					<EntryEmpty
						title="Oops! That page can&rsquo;t be found."
						content="It looks like nothing was found at this location. Maybe try a search?"
					/>
				</main>
			</div>
		</div>
	);
}
