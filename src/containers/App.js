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
import Footer from './Footer';

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
		const { isSidebarExpanded, routes, siteLang } = this.props;
		const pageClass = classNames( {
			'hfeed site': true,
			'sidebar-open': isSidebarExpanded,
		} );

		return (
			<div id="page" className={ pageClass }>
				<Helmet htmlAttributes={ { lang: siteLang } } />

				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				{ <Header /> }

				<div id="content" className="site-content">
					<Switch>
						{ routes.map( route => {
							const { path, exact, component: Component, ...rest } = route;
							const routeProps = {
								path,
								exact,
								key: path,
								render: props => <Component { ...props } { ...rest } />,
							};

							return <Route { ...routeProps } />;
						} ) }
					</Switch>
				</div>

				<Footer />
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
		// prevLocation: state.routing.locationBeforeTransitions,
	};
}

export default hot( module )( withRouter( connect( mapStateToProps )( App ) ) );
