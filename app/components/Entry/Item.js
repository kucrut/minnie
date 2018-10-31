import React, { Component, PropTypes } from 'react';
import EntryTitle from 'components/Entry/Title';
import EntryMeta from 'components/Entry/Meta';
import EntryFormat from 'components/Entry/Format';
import EntryContent from 'components/Entry/Content';
import EntryContentMedia from 'components/Entry/ContentMedia';

export default class Entry extends Component {
	static propTypes = {
		isSingle: PropTypes.bool.isRequired,
		data: PropTypes.object.isRequired,
	}

	constructor( props ) {
		super( props );

		/**
		 * Script elements
		 *
		 * We can't store this in the state because we're injecting the
		 * scripts after the element is mounted/updated. Storing this in
		 * the state will cause a funny looooop.
		 *
		 * @type {Array}
		 */
		this.scriptEls = [];
	}

	componentDidMount() {
		this.injectScripts();
	}

	componentWillUpdate() {
		this.removeScripts();
	}

	componentDidUpdate() {
		this.injectScripts();
	}

	componentWillUnmount() {
		this.removeScripts();
	}

	getElClass() {
		const { data } = this.props;
		let cls = 'hentry';

		cls += ` type-${data.type}`;
		cls += ` format-${data.format}`;

		return cls;
	}

	getContent() {
		const { isSingle, data } = this.props;
		let content;

		if ( isSingle || data.format !== 'standard' ) {
			content = data.content.rendered;
		} else {
			content = data.excerpt.rendered;
		}

		return content;
	}

	removeScripts() {
		this.scriptEls.forEach( el => {
			el.remove();
		} );
	}

	injectScripts() {
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

	renderMeta() {
		const { data } = this.props;
		let el;

		if ( data.type === 'post' || data.type === 'attachment' ) {
			el = ( <EntryMeta data={ data } /> );
		}

		return el;
	}

	renderFormat() {
		const { data } = this.props;
		let el;

		if ( data.type === 'post' ) {
			el = ( <EntryFormat data={ data } /> );
		}

		return el;
	}

	renderContent() {
		const { data } = this.props;
		let el;

		if ( data.type === 'attachment' ) {
			el = ( <EntryContentMedia data={ data } /> );
		} else {
			el = ( <EntryContent content={ this.getContent() } /> );
		}

		return el;
	}

	renderTitle() {
		const { data, isSingle } = this.props;
		let el;

		if ( data.title.rendered ) {
			el = ( <EntryTitle
				title={ data.title.rendered }
				link={ data.link }
				isSingle={ isSingle }
			/> );
		}

		return el;
	}

	render() {
		const { data } = this.props;

		return (
			<article id={ `post-${data.id}` } className={ this.getElClass() }>
				<header className="entry-header">
					{ this.renderTitle() }
					{ this.renderMeta() }
				</header>

				{ this.renderContent() }
				{ this.renderFormat() }
			</article>
		);
	}
}
