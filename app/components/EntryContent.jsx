import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


class EntryContent extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		wrapClass: PropTypes.string,
		dispatch: PropTypes.func.isRequired
	}

	render() {
		const { content, wrapClass } = this.props
		let divClass = wrapClass || 'entry-content'

		return (
			<div className={ divClass } dangerouslySetInnerHTML={{ __html: content }} />
		)
	}
}

export default connect()( EntryContent )
