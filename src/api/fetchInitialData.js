/**
 * Fetch Initial Data
 *
 * This looks at static `needs` parameter in components and waits for the promise
 * to be fullfilled. It is used to make sure server side rendered pages wait for
 * APIs to resolve before returning res.end().
 * As seen in: https://github.com/caljrimmer/isomorphic-redux-app
 *
 * @param {function} dispatch   Store's dispatch function.
 * @param {array}    components Components to render for initial view.
 * @param {object}   params     Fetch parameters.
 *
 * @return Promise
 */

export default function fetchInitialData( dispatch, components, params ) {
	const needs = components.reduce( ( all, current ) => {
		if ( current.need ) {
			return all.concat( current.need );
		}

		return all;
	}, [] );

	const promises = needs.map( need => dispatch( need( params ) ) );

	return Promise.all( promises );
}
