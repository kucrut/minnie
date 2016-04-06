import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

render(
	<Provider>
		<div className="body">Yo!</div>
	</Provider>,
	document.getElementById( 'app' )
);
