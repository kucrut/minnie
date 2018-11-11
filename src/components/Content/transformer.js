import React from 'react';
import { Link } from 'react-router-dom';

export default function transformer( siteUrl, node, children ) {
	switch ( node.tagName.toLowerCase() ) {
		case 'a': {
			let href = node.getAttribute( 'href' );

			if ( ! href ) {
				return;
			}

			href = href.replace( siteUrl, '' );

			if ( href.indexOf( '/' ) !== 0 ) {
				return;
			}

			if ( href.indexOf( '/wp-content' ) === 0 ) {
				return;
			}

			const props = node.getAttributeNames().reduce( ( all, attr ) => {
				if ( attr === 'href' ) {
					return {
						...all,
						to: href,
					}
				}

				return {
					...all,
					[ attr ]: node.getAttribute( attr ),
				}
			}, {} );

			return <Link { ...props }>{ children }</Link>;
		}

		default:
			return;
	}
}
