// TODO: Update lifecycles

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { entryMetaTaxonomies } from '../../config';
import EntryDate from './Date';
import EntryContent from './Content';
import EntryFormat from './Format';
import EntryTitle from './Title';
import EntryTerms from './Terms';

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
		const {
			link,
			date,
			modified,
			date_formatted,
			modified_formatted,
			type,
		} = data;
		const types = [ 'attachment', 'post' ];

		if ( ! types.includes( type ) ) {
			return null;
		}

		const taxTerms = entryMetaTaxonomies.map( taxonomy => {
			const terms = data[ taxonomy ];

			if ( terms && terms.length ) {
				return {
					taxonomy,
					terms,
				}
			}

			return null;
		} ).filter( Boolean );

		return (
			<div className="entry-meta">
				<EntryDate
					link={ link }
					date={ date }
					modified={ modified }
					dateFormatted={ date_formatted }
					modifiedFormatted={ modified_formatted }
				/>
				{ taxTerms.length ? taxTerms.map( item => (
					<EntryTerms key={ item.taxonomy } terms={ item.terms } />
				) ) : null }
			</div>
		);
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
		const { content, description, type } = data;

		if ( type === 'attachment' ) {
			return (
				<div className="entry-content">
					<EntryContent
						className="description"
						content={ description.rendered }
					/>
				</div>
			);
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
