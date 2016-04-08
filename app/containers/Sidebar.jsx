import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PrimaryMenu from 'components/PrimaryMenu'


class Sidebar extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		const { menuItems, isSidebarExpanded } = this.props

		let sbClass = classNames({
			'slide-menu': true,
			'expanded': isSidebarExpanded
		})

		return (
			<div className={ sbClass }>
				<h2 className="widget-title">Menu</h2>
				<PrimaryMenu items={ menuItems } />
			</div>
		)
	}
}

Sidebar.propTypes = {
	menuItems: PropTypes.array.isRequired,
	isSidebarExpanded: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
	const menuItems = state.menu.menus.primary || []

	return {
		isSidebarExpanded: state.ui.isSidebarExpanded,
		menuItems
	}
}

export default connect( mapStateToProps )( Sidebar )
