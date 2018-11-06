import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Route, Switch, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { configureAxios } from '../api/utils';
import { fetchPostFormats } from '../store/actions/terms';
import { fetchPrimaryMenu, fetchSocialMenu } from '../store/actions/menu';
import Header from './Header';
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
		// dispatch: PropTypes.func.isRequired,
		// galleries: PropTypes.object.isRequired,
		// prevLocation: PropTypes.object,
	}

	// TODO: ???
	static contextTypes = {
		router: PropTypes.object.isRequired,
	}

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchPostFormats,
		fetchPrimaryMenu,
		fetchSocialMenu,
	]

	componentDidMount() {
		// Set axios' defaults for browser.
		configureAxios( this.props.apiRoot );
		this.updateHtmlClass();
	}

	updateHtmlClass() {
		const { classList } = document.documentElement;

		classList.remove( 'no-js' );
		classList.add( 'has-js' );
	}

	render() {
		const { isSidebarExpanded, location, routes, siteLang } = this.props;
		const pageClass = classNames( {
			'hfeed site': true,
			'sidebar-open': isSidebarExpanded,
		} );

		return (
			<div id="page" className={ pageClass }>
				<Helmet htmlAttributes={ { lang: siteLang } } />

				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				<Header location={ location } />

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
	return {
		apiRoot: state.info.apiRoot,
		siteLang: state.info.lang,
		isSidebarExpanded: state.ui.isSidebarExpanded,
		// galleries: state.galleries,
	};
}

export default hot( module )( withRouter( connect( mapStateToProps )( App ) ) );
