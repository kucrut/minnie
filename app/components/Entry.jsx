import React, { Component, PropTypes } from 'react'
import EntryTitle from 'components/EntryTitle'
import EntryMeta from 'components/EntryMeta'
import EntryFormat from 'components/EntryFormat'


class Entry extends Component {
	getElClass() {
		const { data } = this.props
		let cls = 'hentry'

		cls += ` type-${data.type}`
		cls += ` format-${data.format}`

		return cls
	}

	getContent() {
		return { __html: this.props.data.content.rendered }
	}

	getExcerpt() {
		return { __html: this.props.data.excerpt.rendered }
	}

	renderMeta() {
		const { data } = this.props

		if ( 'post' === data.type ) {
			return ( <EntryMeta data={ data } /> )
		}
	}

	renderFormat() {
		const { data } = this.props

		if ( 'post' === data.type ) {
			return ( <EntryFormat format={ data.format } /> )
		}
	}

	render() {
		const { data, isSingle } = this.props
		let content = isSingle ? this.getContent() : this.getExcerpt()

		return (
			<article id={ `post-${ data.id }` } className={ this.getElClass() }>
				<header className="entry-header">
					<EntryTitle title={ data.title.rendered } link={ data.link } isSingle={ isSingle } />
					{ this.renderMeta() }
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ content } />

				{ this.renderFormat() }
			</article>
		)
	}
}

Entry.propTypes = {
	isSingle: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired
}

export default Entry
