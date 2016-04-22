import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import closest from 'dom-closest'


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

		if ( anchor.hostname === location.hostname ) {
			e.preventDefault()
			this.props.dispatch( push( anchor.pathname ) )
		}
	}

	render() {
		const { content, wrapClass } = this.props
		let divClass = wrapClass || 'entry-content'

		return (
			<div
				className={ divClass }
				onClick={ this.handleClick }
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		)
	}
}

export default connect()( EntryContent )
