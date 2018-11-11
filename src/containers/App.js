import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Route, Switch, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { closeSidebar } from '../store/actions/ui';
import { fetchPostFormats } from '../store/actions/terms';
import { fetchPrimaryMenu, fetchSocialMenu } from '../store/actions/menu';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import '../css/genericons/genericons/genericons.css';
import '../css/style.css';

class App extends Component {

	static propTypes = {
		apiRoot: PropTypes.string.isRequired,
		siteLang: PropTypes.string.isRequired,
		isSidebarExpanded: PropTypes.bool.isRequired,
		routes: PropTypes.arrayOf( PropTypes.shape( {
			path: PropTypes.string.isRequired,
		} ) ).isRequired,
		// galleries: PropTypes.object.isRequired,
	};

	static need = [
		fetchPostFormats,
		fetchPrimaryMenu,
		fetchSocialMenu,
	];

	componentDidMount() {
		this.updateHtmlClass();
	}

	componentDidUpdate( prevProps ) {
		const { location: oldLocation } = prevProps;
		const { dispatch, location } = this.props;

		if ( location.pathname !== oldLocation.pathname ) {
			dispatch( closeSidebar() );
		}
	}

	updateHtmlClass() {
		const { classList } = document.documentElement;

		classList.remove( 'no-js' );
		classList.add( 'has-js' );
	}

	render() {
		const {
			isSidebarExpanded,
			location,
			menus,
			routes,
			siteLang,
			siteName,
		} = this.props;
		const pageClass = classNames( {
			'hfeed site': true,
			'sidebar-open': isSidebarExpanded,
		} );

		return (
			<div id="page" className={ pageClass }>
				<Helmet htmlAttributes={ { lang: siteLang } } />

				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				<SiteHeader
					isSidebarExpanded={ isSidebarExpanded }
					location={ location }
					menus={ menus }
					siteName={ siteName }
				/>

				<div id="content" className="site-content">
					<Switch>
						{ routes.map( ( route, i ) => <Route key={ i } { ...route } /> ) }
					</Switch>
				</div>

				<SiteFooter />
			</div>
		);
	}
}

function mapStateToProps( state ) {
	const { info, menu, ui } = state;

	return {
		apiRoot: info.apiRoot,
		isSidebarExpanded: ui.isSidebarExpanded,
		menus: menu.menus,
		siteLang: info.lang,
		siteName: info.name,
		// galleries: state.galleries,
	};
}

export default hot( module )( withRouter( connect( mapStateToProps )( App ) ) );
