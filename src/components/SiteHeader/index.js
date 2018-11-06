import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Burger from '../Burger';
import Sidebar from './Sidebar';
import Branding from './Branding';
import SocialMenu from './SocialMenu';

function Header( props ) {
	const { isSidebarExpanded, menus, siteName } = props;
	const { primary, social } = menus;

	return (
		<header id="masthead" className="site-header" role="banner">
			<Branding name={ siteName } />
			{ ( social && social.items.length ) ? (
				<SocialMenu items={ social.items } />
			) : null }
			<Burger />
			<Sidebar menu={ primary } isExpanded={ isSidebarExpanded } />
		</header>
	);
}

Header.propTypes = {
	isSidebarExpanded: PropTypes.bool.isRequired,
	menus: PropTypes.object.isRequired,
	siteName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ( {
	isSidebarExpanded: state.ui.isSidebarExpanded,
	menus: state.menu.menus,
	siteName: state.info.name,
} );

export default connect( mapStateToProps )( Header );
