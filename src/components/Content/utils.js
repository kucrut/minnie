import { siteUrl } from '../../config';

export function isInternalUrl( url ) {
	if ( url.indexOf( siteUrl ) !== 0 ) {
		return false;
	}

	// TODO: Add /wp-content to config.
	if ( url.indexOf( `${ siteUrl }/wp-content` ) === 0 ) {
		return false;
	}

	return true;
}

export function stripSiteUrl( url ) {
	return url.replace( siteUrl, '' );
}
