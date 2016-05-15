import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PrimaryMenu from 'components/PrimaryMenu';
import SearchForm from 'components/SearchForm';


class Sidebar extends Component {
	static propTypes = {
		menus:             PropTypes.object.isRequired,
		isSidebarExpanded: PropTypes.bool.isRequired,
		dispatch:          PropTypes.func.isRequired
	}

	renderMenu() {
		const { primary } = this.props.menus;
		let el;

		if ( primary && primary.items.length ) {
			el = ( <PrimaryMenu items={ primary.items } /> );
		}

		return el;
	}

	render() {
		const { isSidebarExpanded } = this.props;

		const sbClass = classNames({
			'slide-menu': true,
			expanded:     isSidebarExpanded
		});

		return (
			<div className={ sbClass }>
				<h2 className="widget-title">Menu</h2>
				{ this.renderMenu() }
				<SearchForm />
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		menus:             state.menu.menus,
		isSidebarExpanded: state.ui.isSidebarExpanded
	};
}

export default connect( mapStateToProps )( Sidebar );
