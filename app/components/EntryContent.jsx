import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { stripApiHost, isInternalLink } from 'helpers.js'


class EntryContent extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		wrapClass: PropTypes.string,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props )
		this.onClick = this.onClick.bind( this )
	}

	onClick(e) {
		const anchor = e.target.closest('a')

		if ( anchor && isInternalLink( anchor.href ) ) {
			e.preventDefault()
			this.props.dispatch( push( stripApiHost( anchor.href ) ) )
		}
	}

	render() {
		const { content, wrapClass } = this.props
		let divClass = wrapClass || 'entry-content'

		return (
			<div className={ divClass } dangerouslySetInnerHTML={{ __html: content }} onClick={ this.onClick } />
		)
	}
}

export default connect()( EntryContent )
