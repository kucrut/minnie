import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppContext } from './contexts';
import createRoutes from './routes';
import configureStore from './store';
import { configureAxios } from './api/utils';
import App from './containers/App';

// TODO: Check if we need to work-around hash link scroll.

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
const store = configureStore( initialState );
const routes = createRoutes( store.getState().taxonomies.items );

// Set axios' defaults for browser.
configureAxios( initialState.info.apiRoot );

hydrate(
	<Provider store={ store }>
		<BrowserRouter>
			<AppContext.Provider value={ { isServer: false } }>
				<App routes={ routes } />
			</AppContext.Provider>
		</BrowserRouter>
	</Provider>,
	document.getElementById( 'app' )
);
