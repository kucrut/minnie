import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import toggleSidebar from '../store/actions/ui';

function Burger( props ) {
	const { dispatch, isSidebarExpanded } = props;
	const buttonProps = {
		title: 'Sidebar',
		className: classNames( {
			'menu-toggle': true,
			'toggle-on': isSidebarExpanded,
		} ),
		onClick: () => dispatch( toggleSidebar() ),
	}

	return (
		<button { ...buttonProps }>
			<span className="screen-reader-text">Sidebar</span>
		</button>
	);
}

Burger.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isSidebarExpanded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ( {
	isSidebarExpanded: state.ui.isSidebarExpanded,
} );

export default connect( mapStateToProps )( Burger );
