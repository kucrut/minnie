import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import he from 'he';
import { entryMetaTaxonomies } from 'config';

/**
 * TODO: Display author link?
 */
export default class EntryMeta extends Component {
	static propTypes = { data: PropTypes.object.isRequired }

	renderDate() {
		const {
			link,
			date,
			modified,
			date_formatted: dateFormatted,
			modified_formatted: modifiedFormatted,
		} = this.props.data;

		return (
			<span className="posted-on">
				<Link to={ link } rel="bookmark">
					<time className="entry-date published" dateTime={ date }>{ dateFormatted }</time>
					<time className="updated" dateTime={ modified }>{ modifiedFormatted }</time>
				</Link>
			</span>
		);
	}

	renderTerms( taxonomy ) {
		const terms = this.props.data[ taxonomy ];
		let el;

		if ( terms && terms.length ) {
			el = (
				<span className="tags-links" key={ taxonomy }>
					{ terms.map( term =>
						( <span key={ term.id }>
							<Link to={ term.link } rel="tag">{ he.decode( term.name ) }</Link>
						</span> )
					) }
				</span>
			);
		}

		return el;
	}

	/**
	 * TODO: Display media meta?
	 */
	render() {
		return (
			<div className="entry-meta">
				{ this.renderDate() }
				{ entryMetaTaxonomies.map( taxonomy => this.renderTerms( taxonomy ) ) }
			</div>
		);
	}
}
