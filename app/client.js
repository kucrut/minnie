import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import configureStore from './store/configureStore';

// Stolen from https://github.com/reactjs/react-router/issues/394#issuecomment-220221604
function hashLinkScroll() {
	const { hash } = window.location;

	if ( hash === '' ) {
		return;
	}

	// Push onto callback queue so it runs after the DOM is updated,
	// this is required when navigating from a different page so that
	// the element is rendered on the page before trying to getElementById.
	setTimeout( () => {
		const id = hash.replace( '#', '' );
		const element = document.getElementById( id );

		if ( element ) {
			element.scrollIntoView();
		}
	}, 0 );
}

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
const store = configureStore( initialState );

hydrate(
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById( 'app' )
);
