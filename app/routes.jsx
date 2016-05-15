import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routes } from 'config';
import App from 'containers/App';
import Index from 'pages/Index';
import Page from 'pages/Page';
import Post from 'pages/Post';
import Media from 'pages/Media';
import NotFound from 'pages/404';


/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default function () {
	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Index } />
			<Route path="page/:page" component={ Index } />
			<Route path={ routes.tagArchive } component={ Index }>
				<Route path="page/:page" component={ Index } />
			</Route>
			<Route path={ routes.formatArchive } component={ Index }>
				<Route path="page/:page" component={ Index } />
			</Route>
			<Route path={ routes.categoryArchive } component={ Index }>
				<Route path="page/:page" component={ Index } />
			</Route>
			<Route path={ routes.post } component={ Post } />
			<Route path={ routes.media } component={ Media } />
			<Route path={ routes.page } component={ Page } />
			<Route path={ routes.subPage } component={ Page } />
			<Route path="*" component={ NotFound } />
		</Route>
	);
}
