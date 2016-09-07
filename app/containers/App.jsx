/* global ga */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { gaId } from 'config';
import { configureAxios } from 'helpers';
import fetchInfo from 'actions/info';
import { fetchPostFormats } from 'actions/terms';
import { fetchPrimaryMenu, fetchSocialMenu } from 'actions/menu';
import Helmet from 'react-helmet';
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import PhotoSwipe from 'components/PhotoSwipe';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import 'css/genericons/genericons/genericons.css';

// For some reason, requiring this from `node_modules` dir will pull all css files :(
require( 'css/prism-coy.css' );
require( 'prismjs/plugins/line-numbers/prism-line-numbers.css' );
require( 'css/style.css' );

class App extends Component {

	static propTypes = {
		apiUrl:            PropTypes.string.isRequired,
		siteLang:          PropTypes.string.isRequired,
		hasGalleries:      PropTypes.bool.isRequired,
		isSidebarExpanded: PropTypes.bool.isRequired,
		children:          PropTypes.object,
		dispatch:          PropTypes.func.isRequired
	}

	static contextTypes = {
		router: PropTypes.object.isRequired
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
		fetchSocialMenu
	]

	componentDidMount() {
		configureAxios( this.props.apiUrl );
		this.insertGAScript();
	}

	insertGAScript() {
		if ( ! gaId ) {
			return;
		}

		const el = document.createElement( 'script' );

		el.src    = 'https://www.google-analytics.com/analytics.js';
		el.async  = true;
		el.onload = this.initializeGA.bind( this );

		document.body.appendChild( el );
	}

	initializeGA() {
		ga( 'create', gaId, 'auto' );
		ga( 'send', 'pageview' );

		this.context.router.listen( location => {
			ga( 'set', 'page', location.pathname );
			ga( 'send', 'pageview' );
		});
	}

	renderPhotoSwipe() {
		let el;

		if ( this.props.hasGalleries ) {
			el = ( <PhotoSwipe /> );
		}

		return el;
	}

	render() {
		const pageClass = classNames({
			'hfeed site':   true,
			'sidebar-open': this.props.isSidebarExpanded
		});

		return (
			<div id="page" className={ pageClass }>
				<Helmet htmlAttributes={ { lang: this.props.siteLang } } />

				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				<Header />

				<div id="content" className="site-content">
					{ this.props.children }
				</div>

				<Footer />

				{ this.renderPhotoSwipe() }
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		apiUrl:            state.info.apiUrl,
		siteLang:          state.info.lang,
		hasGalleries:      ( 0 < state.galleries.groups.length ),
		isSidebarExpanded: state.ui.isSidebarExpanded
	};
}

export default connect( mapStateToProps )( App );
