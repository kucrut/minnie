import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../Burger';
import Sidebar from './Sidebar';
import Branding from './Branding';
import SocialMenu from './SocialMenu';

export default function SiteHeader( props ) {
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

SiteHeader.propTypes = {
	isSidebarExpanded: PropTypes.bool.isRequired,
	siteName: PropTypes.string.isRequired,
	menus: PropTypes.shape( {
		primary: PropTypes.object,
		social: PropTypes.object,
	} ).isRequired,
};
