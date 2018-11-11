export function isInternalUrl( siteUrl, url ) {
	if ( url.indexOf( '/' ) === 0 ) {
		return true;
	}

	if ( url.indexOf( siteUrl ) !== 0 ) {
		return false;
	}

	// TODO: Add /wp-content to config.
	if ( url.indexOf( `${ siteUrl }/wp-content` ) === 0 ) {
		return false;
	}

	return true;
}

export function stripSiteUrl( siteUrl, url ) {
	return url.replace( siteUrl, '' );
}
