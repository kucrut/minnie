// TODO.
export function injectScripts() {
	if ( this.props.data.type === 'attachment' ) {
		return;
	}

	const { scripts } = this.props.data.content;
	const scriptEls = [];

	if ( ! scripts ) {
		return;
	}

	scripts.forEach( src => {
		const el = document.createElement( 'script' );

		el.src   = src;
		el.async = true;

		document.body.appendChild( el );
		scriptEls.push( el );
	} );

	this.scriptEls = scriptEls;
}
