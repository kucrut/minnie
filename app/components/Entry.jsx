import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EntryTitle from 'components/EntryTitle'
import EntryMeta from 'components/EntryMeta'
import EntryFormat from 'components/EntryFormat'
import EntryContent from 'components/EntryContent'
import EntryContentMedia from 'components/EntryContentMedia'


export default class Entry extends Component {
	static propTypes = {
		isSingle: PropTypes.bool.isRequired,
		data: PropTypes.object.isRequired
	}

	constructor( props ) {
		super( props )

		/**
		 * Script elements
		 *
		 * We can't store this in the state because we're injecting the
		 * scripts after the element is mounted/updated. Storing this in
		 * the state will cause a funny looooop.
		 *
		 * @type {Array}
		 */
		this.scriptEls = []
	}

	injectScripts() {
		if ( 'attachment' === this.props.data.type ) {
			return
		}

		const { scripts } = this.props.data.content
		let scriptEls = []

		if ( ! scripts ) {
			return
		}

		scripts.forEach( src => {
			let el = document.createElement( 'script' )

			el.src = src
			el.async = true

			document.body.appendChild( el )
			scriptEls.push( el )
		})

		this.scriptEls = scriptEls
	}

	removeScripts() {
		this.scriptEls.forEach( el => {
			el.remove()
		})
	}

	componentWillUpdate() {
		this.removeScripts()
	}

	componentWillUnmount() {
		this.removeScripts()
	}

	componentDidMount() {
		this.injectScripts()
	}

	componentDidUpdate() {
		this.injectScripts()
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
		let content

		if ( isSingle || 'standard' !== data.format ) {
			content = data.content.rendered
		} else {
			content = data.excerpt.rendered
		}

		return content
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
			return ( <EntryContentMedia data={ data } /> )
		} else {
			return ( <EntryContent content={ this.getContent() } /> )
		}
	}

	renderTitle() {
		const { data, isSingle } = this.props

		if ( data.title.rendered ) {
			return ( <EntryTitle title={ data.title.rendered } link={ data.link } isSingle={ isSingle } /> )
		}
	}

	render() {
		const { data, isSingle } = this.props

		return (
			<article id={ `post-${ data.id }` } className={ this.getElClass() }>
				<header className="entry-header">
					{ this.renderTitle() }
					{ this.renderMeta() }
				</header>

				{ this.renderContent() }
				{ this.renderFormat() }
			</article>
		)
	}
}
