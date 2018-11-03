import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import routes from '../routes';
import { configureAxios } from '../helpers';
import fetchInfo from '../actions/info';
import { fetchPostFormats } from '../actions/terms';
import { fetchPrimaryMenu, fetchSocialMenu } from '../actions/menu';
import Header from './Header';
import Footer from './Footer';

import '../css/genericons/genericons/genericons.css';
import '../css/style.css';

class App extends Component {

	static propTypes = {
		apiUrl: PropTypes.string.isRequired,
		siteLang: PropTypes.string.isRequired,
		isSidebarExpanded: PropTypes.bool.isRequired,
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
		fetchInfo,
		fetchPostFormats,
		fetchPrimaryMenu,
		fetchSocialMenu,
	]

	componentDidMount() {
		configureAxios( this.props.apiUrl );
		this.updateHtmlClass();
	}

	updateHtmlClass() {
		const { classList } = document.documentElement;

		classList.remove( 'no-js' );
		classList.add( 'has-js' );
	}

	render() {
		const { isSidebarExpanded, siteLang } = this.props;
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
		apiUrl: state.info.apiUrl,
		siteLang: state.info.lang,
		isSidebarExpanded: state.ui.isSidebarExpanded,
		// galleries: state.galleries,
		// prevLocation: state.routing.locationBeforeTransitions,
	};
}

export default connect( mapStateToProps )( App );
