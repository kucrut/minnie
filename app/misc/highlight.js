/* eslint global-require: 0, import/newline-after-import: 0 */

import Prism from 'prismjs';
import { codeHighlight } from 'config';
require( 'prismjs/plugins/line-numbers/prism-line-numbers.js' );
codeHighlight.languages.forEach( lang => {
	require( `prismjs/components/prism-${lang}.js` );
});

/**
 * Highlight code with Prism.js
 *
 * @param  {object}  el Wrapper element.
 */
export default function highlightCode( el ) {
	const blocks = el.querySelectorAll( 'pre code' );

	if ( ! blocks.length ) {
		return;
	}

	for ( let i = 0; i < blocks.length; ++i ) {
		const block = blocks[ i ];
		block.parentElement.classList.add( 'line-numbers' );
		Prism.highlightElement( block );
	}
}
