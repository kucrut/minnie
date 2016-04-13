import React, { Component, PropTypes } from 'react'
import { forEach } from 'lodash'
import Content_Mixin from 'mixins/Content'


/**
 * TODO: Support more media types.
 */
export default class MediaContent extends Content_Mixin {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	getImagePreviewSrc() {
		const { sizes } = this.props.data.media_details
		let src = ''

		forEach( [ 'medium', 'thumbnail', 'full' ], size => {
			if ( sizes[ size ] ) {
				src = sizes[ size ].source_url
				return false
			}
		})

		return src
	}

	getContent() {
		const { caption, description } = this.props.data

		if ( description ) {
			return { __html: description }
		} else {
			return { __html: `<p>${ caption }</p>` }
		}
	}

	renderMedia() {
		const { source_url } = this.props.data
		let mediaSrc = this.getImagePreviewSrc()

		if ( mediaSrc ) {
			return (
				<p className="attachment">
					<a href={ source_url }><img src={ mediaSrc } /></a>
				</p>
			)
		}
	}

	render() {
		return (
			<div className="entry-content">
				{ this.renderMedia() }
				<div className="description"
					dangerouslySetInnerHTML={ this.getContent() }
					onClick={ this.onClick } />
			</div>
		)
	}
}
