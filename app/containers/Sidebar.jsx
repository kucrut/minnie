import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'


class Sidebar extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		let sbClass = classNames({
			'slide-menu': true,
			'expanded': this.props.isSidebarExpanded
		})

		return (
			<div className={ sbClass }>
				Sidebar content.
			</div>
		)
	}
}

Sidebar.propTypes = {
	isSidebarExpanded: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
	return {
		isSidebarExpanded: state.ui.isSidebarExpanded
	}
}

export default connect( mapStateToProps )( Sidebar )
