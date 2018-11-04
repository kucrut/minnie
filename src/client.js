import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import createRoutes from './config/routes';
import App from './containers/App';
import configureStore from './store';

// TODO: Check if we need to work-around hash link scroll.

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
const store = configureStore( initialState );
const routes = createRoutes( store.getState().taxonomies.items );

hydrate(
	<Provider store={ store }>
		<BrowserRouter>
			<App routes={ routes } />
		</BrowserRouter>
	</Provider>,
	document.getElementById( 'app' )
);
