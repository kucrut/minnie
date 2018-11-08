import { Filter } from 'interweave';
import { trim } from 'lodash';

import { siteUrl } from '../../../config';

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

class InternalLinkFilter extends Filter {
	attribute( name, value ) {
		if ( name !== 'href' ) {
			return value;
		}

		if ( ! isInternalUrl( value ) ) {
			return value;
		}

		let newValue = value.replace( siteUrl, '' );
		newValue = trim( newValue, '/' );
		newValue = `/${ newValue }`;

		return newValue;
	}
}

export default [
	InternalLinkFilter,
];
