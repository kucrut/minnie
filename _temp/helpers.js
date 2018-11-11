export const contentPathRegEx = new RegExp( '^/wp-content/' );

export function canUseDOM() {
	return !! (
		( typeof window !== 'undefined' && window.document && window.document.createElement )
	);
}

export function getToken() {
	const token = canUseDOM ? localStorage.getItem( 'minnieToken' ) : '';

	return token;
}

/**
 *  Wait for something :)
 *
 *  Promise-based setTimeout() as seen in
 *  http://stackoverflow.com/a/32543590/3313333
 *
 *  @param  {number}  interval Wait interval (ms)
 *  @return {Promise}
 */
export function wait( interval ) {
	return new Promise( resolve => setTimeout( resolve, interval ) );
}

/**
 *  Check other state
 *
 *  @param  {func}    getState From redux.
 *  @param  {string}  State name.
 *  @param  {number}  Check interval (ms).
 *  @return {Promise}
 */
export function checkOtherState( getState, name, interval = 100 ) {
	const store = getState();

	if ( ! store.hasOwnProperty( name ) ) {
		return Promise.reject( `"${name}" could not be found in store.` );
	}

	if ( store[ name ].isFetching ) {
		return wait( interval ).then( () => checkOtherState( getState, name, interval ) );
	}

	return Promise.resolve( store[ name ] );
}

export function getQueryVar( name, url ) {
	const qvar = name.replace( /[[]]/g, '\\$&' );
	const regex = new RegExp( `[?&]${qvar}(=([^&#]*)|&|#|$)` );
	const results = regex.exec( url );

	if ( ! results ) {
		return null;
	}

	if ( ! results[ 2 ] ) {
		return '';
	}

	return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
}

export function hashCode( str ) {
	return str.split( '' ).reduce( ( prevHash, currVal ) =>
		( ( prevHash << 5 ) - prevHash ) + currVal.charCodeAt( 0 ), 0 );
}
