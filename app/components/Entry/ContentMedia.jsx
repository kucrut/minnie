import React, { PropTypes } from 'react';
import EntryContent from 'components/Entry/Content';


/**
 * TODO: Support more media types.
 */
export default class MediaContent extends EntryContent {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	getImagePreviewSrc() {
		const { sizes } = this.props.data.media_details;
		let src = '';

		for ( const size of ['large', 'medium', 'thumbnail', 'full'] ) {
			if ( sizes[ size ] ) {
				src = sizes[ size ].source_url;
				break;
			}
		}

		return src;
	}

	renderContent() {
		const { caption, description } = this.props.data;
		let content = '';
		let el;

		if ( description ) {
			content = description;
		} else if ( caption ) {
			content = caption;
		}

		if ( content ) {
			el = ( <EntryContent content={ content } wrapClass="description" /> );
		}

		return el;
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
