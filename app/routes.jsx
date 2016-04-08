import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routes } from 'api/config.json'
import App from 'containers/App'
import Home from 'containers/Home'
import Singular from 'containers/Singular'


/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default ( store ) => {
	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route path={ routes.page } component={ Singular } />
		</Route>
	)
}
