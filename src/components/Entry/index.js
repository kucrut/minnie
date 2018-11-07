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

	componentDidMount() {
		this.injectScripts();
	}

	componentDidUpdate() {
		this.removeScripts();
		this.injectScripts();
	}

	componentWillUnmount() {
		this.removeScripts();
	}

	injectScripts() {
		const { data } = this.props;
		const { content, type } = data;

		if ( type === 'attachment' ) {
			return;
		}

		const { scripts = [] } = content;
		this.scriptEls = [];

		if ( ! scripts.length ) {
			return;
		}

		scripts.forEach( src => {
			const el = document.createElement( 'script' );

			el.src   = src;
			el.async = true;

			document.body.appendChild( el );
			this.scriptEls = this.scriptEls.concat( el );
		} );
	}

	removeScripts() {
		this.scriptEls.forEach( el => el.remove() );
	}

	renderMeta() {
		const { data } = this.props;
		const { type } = data;

		if ( type === 'post' || type === 'attachment' ) {
			return <EntryMeta data={ data } />;
		}

		return null;
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
		const { content, type } = data;

		if ( type === 'attachment' ) {
			return <EntryContentMedia data={ data } />;
		}

		// TODO: Maybe support displaying excerpt only.
		return <EntryContent content={ content.rendered } />;
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
		const { format, type } = data;
		const className = `hentry type-${ type } format-${ format }`;

		return (
			<article id={ `post-${data.id}` } className={ className }>
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
