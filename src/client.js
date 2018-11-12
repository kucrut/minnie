import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppContext } from './contexts';
import createRoutes from './routes';
import configureStore from './store';
import { configureAxios } from './api/utils';
import App from './containers/App';

const config = window.__CONFIG__;
const initialState = window.__INITIAL_STATE__;
const store = configureStore( initialState );
const { info, taxonomies } = store.getState();
const routes = createRoutes( taxonomies.items, config.blogPrefix );
const appContext = {
	...config,
	isServer: false,
};

delete window.__CONFIG__;
delete window.__INITIAL_STATE__;

// Set axios' defaults for browser.
configureAxios( info.apiRoot );

hydrate(
	<Provider store={ store }>
		<BrowserRouter>
			<AppContext.Provider value={ appContext }>
				<App routes={ routes } />
			</AppContext.Provider>
		</BrowserRouter>
	</Provider>,
	document.getElementById( 'app' )
);
