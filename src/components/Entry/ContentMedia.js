import React from 'react';
import PropTypes from 'prop-types';

import EntryContent from './Content';

/**
 * TODO: Support more media types.
 */
export default class MediaContent extends EntryContent {
	static propTypes = { data: PropTypes.object.isRequired }

	getImagePreviewSrc() {
		const { sizes } = this.props.data.media_details;
		let src = '';

		for ( const size of [ 'large', 'medium', 'thumbnail', 'full' ] ) {
			if ( sizes[ size ] ) {
				src = sizes[ size ].source_url;
				break;
			}
		}

		return src;
	}

	renderContent() {
		const { data } = this.props;
		const { caption } = data;

		if ( caption.rendered ) {
			return <EntryContent content={ caption.rendered } wrapClass="description" />;
		}

		return null;
	}

	renderMedia() {
		const mediaSrc = this.getImagePreviewSrc();
		let el;

		if ( mediaSrc ) {
			el = (
				<p className="attachment">
					<a href={ this.props.data.source_url }><img src={ mediaSrc } alt="" /></a>
				</p>
			);
		}

		return el;
	}

	render() {
		return (
			<div className="entry-content">
				{ this.renderMedia() }
				{ this.renderContent() }
			</div>
		);
	}
}
