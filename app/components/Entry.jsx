import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Content_Mixin from 'mixins/Content'
import EntryTitle from 'components/EntryTitle'
import EntryMeta from 'components/EntryMeta'
import EntryFormat from 'components/EntryFormat'
import MediaContent from 'components/MediaContent'


class Entry extends Content_Mixin {
	constructor( props ) {
		super( props )
		this.onClick = this.onClick.bind( this )
	}

	getElClass() {
		const { data } = this.props
		let cls = 'hentry'

		cls += ` type-${data.type}`
		cls += ` format-${data.format}`

		return cls
	}

	getContent() {
		const { isSingle, data } = this.props

		if ( isSingle || 'standard' !== data.format ) {
			return { __html: data.content.rendered }
		} else {
			return { __html: data.excerpt.rendered }
		}
	}

	renderMeta() {
		const { data } = this.props

		if ( 'post' === data.type || 'attachment' === data.type ) {
			return ( <EntryMeta data={ data } /> )
		}
	}

	renderFormat() {
		const { data } = this.props

		if ( 'post' === data.type ) {
			return ( <EntryFormat data={ data } /> )
		}
	}

	renderContent() {
		const { isSingle, data } = this.props

		if ( 'attachment' === data.type ) {
			return ( <MediaContent data={ data } /> )
		} else {
			return (
				<div
					className="entry-content"
					dangerouslySetInnerHTML={ this.getContent() }
					onClick={ this.onClick } />
			)
		}
	}

	render() {
		const { data, isSingle } = this.props

		return (
			<article id={ `post-${ data.id }` } className={ this.getElClass() }>
				<header className="entry-header">
					<EntryTitle title={ data.title.rendered } link={ data.link } isSingle={ isSingle } />
					{ this.renderMeta() }
				</header>

				{ this.renderContent() }
				{ this.renderFormat() }
			</article>
		)
	}
}

Entry.propTypes = {
	isSingle: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired
}

export default connect()(Entry)
