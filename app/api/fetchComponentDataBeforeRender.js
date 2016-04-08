/**
* This looks at static needs parameter in components and waits for the promise to be fullfilled
* It is used to make sure server side rendered pages wait for APIs to resolve before returning res.end()
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

export function fetchComponentDataBeforeRender(dispatch, components, params) {

	// Commenting this out since it's producing duplicates.
	/*
	const needs = components.reduce( (prev, current) => {
		return (current.need || [])
			.concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
			.concat(prev);
	}, []);
	*/

	const needs = components.reduce( ( prev, current ) => {
		let more

		if ( current.need && current.WrappedComponent ) {
			more = current.WrappedComponent.need
		} else {
			more = []
		}

		return more.concat( prev )
	}, [] )

	const promises = needs.map( need => dispatch( need( params ) ) );

	return Promise.all( promises );
}
