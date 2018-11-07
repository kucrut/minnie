// TODO: Update lifecycles

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EntryTitle from './Title';
import EntryMeta from './Meta';
import EntryFormat from './Format';
import EntryContent from './Content';
import EntryContentMedia from './ContentMedia';

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

	/*
	componentDidMount() {
		this.injectScripts();
	}

	componentWillUpdateX() {
		this.removeScripts();
	}

	componentDidUpdate() {
		this.injectScripts();
	}

	componentWillUnmount() {
		this.removeScripts();
	}
	*/

	getElClass() {
		const { data } = this.props;
		let cls = 'hentry';

		cls += ` type-${data.type}`;
		cls += ` format-${data.format}`;

		return cls;
	}

	getContent() {
		// TODO: Support displaying excerpt only.
		return this.props.data.content.rendered;
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

		if ( data.type === 'post' ) {
			return <EntryFormat data={ data } />;
		}

		return null;
	}

	renderContent() {
		const { data } = this.props;
		const { type } = data;

		if ( type === 'attachment' ) {
			return <EntryContentMedia data={ data } />;
		}

		return <EntryContent content={ this.getContent() } />;
	}

	renderTitle() {
		const { data, isSingle } = this.props;
		const { link, title } = data;

		if ( ! title.rendered ) {
			return null;
		}

		return <EntryTitle title={ title.rendered } link={ isSingle ? '' : link } />;
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
