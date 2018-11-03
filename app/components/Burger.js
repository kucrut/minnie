import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import toggleSidebar from '../actions/ui';

class Burger extends Component {
	static propTypes = {
		isSidebarExpanded: PropTypes.bool.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );
		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.dispatch( toggleSidebar() );
	}

	render() {
		const buttonClass = classNames( {
			'menu-toggle': true,
			'toggle-on': this.props.isSidebarExpanded,
		} );

		return (
			<button className={ buttonClass } title="Sidebar" onClick={ this.onClick }>
				<span className="screen-reader-text">Sidebar</span>
			</button>
		);
	}
}

function mapStateToProps( state ) {
	return { isSidebarExpanded: state.ui.isSidebarExpanded };
}

export default connect( mapStateToProps )( Burger );
