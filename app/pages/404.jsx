import React from 'react'
import Helmet from 'react-helmet'


const NotFound = props => {
	return (
		<div className="content">
			<Helmet title="Oops!" />

			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">
					<section className="error-404 not-found">
						<header className="page-header">
							<h1 className="page-title">Oops! That page can&rsquo;t be found.</h1>
						</header>

						<div className="page-content">
							<p>It looks like nothing was found at this location. Maybe try a search?</p>
							{ /* Render search form */ }
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}

export default NotFound
