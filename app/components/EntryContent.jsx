import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { forEach } from 'lodash'
import { contentPathRegEx } from 'helpers'
import closest from 'dom-closest'

// Feels hacky ;-)
import Prism from 'prismjs'
import { codeHighlight } from 'config'
require( 'prismjs/plugins/line-numbers/prism-line-numbers.js' )
forEach( codeHighlight.languages, lang => {
	require( `prismjs/components/prism-${lang}.js` )
})


class EntryContent extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		wrapClass: PropTypes.string,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props )
		this.handleClick = this.handleClick.bind( this )
	}

	handleClick( e ) {
		let anchor = closest( e.target, 'a' )

		if ( ! anchor ) {
			return
		}

		if ( anchor.hostname !== location.hostname ) {
			return
		}

		if ( contentPathRegEx.test( anchor.pathname ) ) {
			return
		}

		e.preventDefault()
		this.props.dispatch( push( anchor.pathname ) )
	}

	highlightCode() {
		const blocks = this.theContent.querySelectorAll( 'pre code' );
		if ( ! blocks.length ) {
			return
		}

		forEach( blocks, block => {
			block.parentElement.className = `${block.parentElement.className} line-numbers`
			Prism.highlightElement( block )
		})
	}

	componentDidMount() {
		this.highlightCode()
	}

	render() {
		const { content, wrapClass } = this.props
		let divClass = wrapClass || 'entry-content'

		return (
			<div
				className={ divClass }
				onClick={ this.handleClick }
				ref={ (ref) => this.theContent = ref }
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		)
	}
}

export default connect()( EntryContent )
