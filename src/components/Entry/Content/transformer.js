import React from 'react';
import { Link } from 'react-router-dom';

import { isInternalUrl, stripSiteUrl } from './utils';

export default function transformer( node, children ) {
	switch ( node.tagName.toLowerCase() ) {
		case 'a': {
			const href = node.getAttribute( 'href' );

			if ( ! isInternalUrl( href ) ) {
				return;
			}

			const props = node.getAttributeNames().reduce( ( all, attr ) => {
				const key = attr === 'href' ? 'to' : attr;
				const value = key === 'to'
					? stripSiteUrl( href )
					: node.getAttribute( attr );

				return {
					...all,
					[ key ]: value,
				};
			}, {} );

			return <Link { ...props }>{ children }</Link>;
		}

		default:
			return;
	}
}
