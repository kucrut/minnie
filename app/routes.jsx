import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routes } from 'api/config.json'
import App from 'containers/App'
import Index from 'pages/Index'
import Page from 'pages/Page'
import Post from 'pages/Post'
import NotFound from 'pages/404'


/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default ( store ) => {
	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Index } />
			<Route path={ routes.pagedIndex } component={ Index } />
			<Route path={ routes.postFormatArchive } component={ Index } />
			<Route path={ routes.pagedPostFormatArchive } component={ Index } />
			<Route path={ routes.categoryArchive } component={ Index } />
			<Route path={ routes.pagedCategoryArchive } component={ Index } />
			<Route path={ routes.page } component={ Page } />
			<Route path={ routes.post } component={ Post } />
			<Route path="*" component={ NotFound } />
		</Route>
	)
}
