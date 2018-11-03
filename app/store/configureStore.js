/* eslint global-require: 0 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import promiseMiddleware from '../api/promiseMiddleware';
import rootReducer from '../reducers';

/*
 * @param {Object} initialState Initial state to bootstrap our stores with for server-side rendering.
 */
export default function configureStore( initialState ) {
	const middleware = [ thunk, promiseMiddleware ];
	const finalCreateStore = applyMiddleware( ...middleware )( createStore );
	const store = finalCreateStore( rootReducer, initialState );

	if ( module.hot ) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept( '../reducers', () => {
			const nextReducer = require( '../reducers' );

			store.replaceReducer( nextReducer.default );
		} );
	}

	return store;
}
