import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import he from 'he';
import { parse } from 'qs';
import { isEqual } from 'lodash';

import { getAdjacentLink } from '../helpers';
import { fetchArchive, fetchArchiveTerm } from '../actions/archive';
import PageHeader from '../components/PageHeader';
import ContentNavigation from '../components/ContentNavigation';
import Entry from '../components/Entry/Item';
import EntryEmpty from '../components/Entry/Empty';
import Spinner from '../components/Spinner';

class Index extends Component {
	static propTypes = {
		info: PropTypes.object.isRequired,
		archive: PropTypes.object.isRequired,
		match: PropTypes.shape( {
			isExact: PropTypes.bool.isRequired,
			params: PropTypes.object.isRequired,
			path: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		} ).isRequired,
		query: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		// route: PropTypes.object.isRequired,
		// routeParams: PropTypes.object.isRequired,
	}

	static need = [
		fetchArchive,
		fetchArchiveTerm,
	]

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is an archive page)
	 * we need not do anything, because the data will be fetched automatically via
	 * `fetchComponentDataBeforeRender()`. However, when invoked on the client, we need
	 * to fetch the data first.
	 */
	componentWillMountX() {
		const { archive, routeParams, query } = this.props;
		const { isFetching, fetchParams, currentPage } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign( {}, routeParams, query );

		if ( currentPage === 0 || ! isEqual( params, fetchParams ) ) {
			// this.fetchData( params );
		}
	}

	/**
	 * Before changing page
	 *
	 * This is invoked on the client when the visitor transitions between archive pages.
	 *
	 * @param  {object} nextProps Next properties.
	 */
	componentWillReceivePropsX( nextProps ) {
		const { archive, routeParams, query } = nextProps;
		const { isFetching, fetchParams } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign( {}, routeParams, query );

		if ( ! isEqual( params, fetchParams ) ) {
			this.fetchData( params );
		}
	}

	componentDidUpdate( prevProps ) {
		const { archive, location, match, query } = this.props;
		const { location: prevLocation } = prevProps;
		const { isFetching } = archive;

		if ( isFetching ) {
			return;
		}

		if ( isEqual( prevLocation, location ) ) {
			return;
		}

		this.fetchData( {
			...match.params,
			...query,
		} );
	}

	fetchData( params ) {
		const { dispatch } = this.props;

		dispatch( fetchArchive( params ) );
		dispatch( fetchArchiveTerm( params ) );
	}

	/**
	 * Document title
	 *
	 * TODO: Maybe fetch this from SEO plugin?
	 */
	renderHelMet() {
		const { archive, info, match } =  this.props;
		const { term, searchTerm } = archive;
		const { params } = match;
		const { page } = params;

		let title = '';

		if ( term || searchTerm ) {
			if ( term ) {
				title = term.name;
			} else {
				title = `Search results for “${searchTerm}”`;
			}

			if ( page ) {
				title = `${title} — Page ${page}`;
			}

			title = `${title} | ${info.name}`;
		} else { // Home
			title = info.name;

			if ( page ) {
				title = `${title} — Page ${page}`;
			}
		}

		return (
			<Helmet title={ he.decode( title ) } />
		);
	}

	/**
	 * Archive Title
	 *
	 * Unless we're displaying the homepage, we need to display the archive title,
	 * which is the term title ( `get_queried_object()` in WordPress ).
	 */
	renderTitle() {
		const { term, searchTerm, items } = this.props.archive;
		let title;
		let description;
		let el;

		if ( searchTerm ) {
			title = `Search results for “${searchTerm}”`;
		} else {
			if ( term && items.length ) {
				title = he.decode( term.name );

				if ( term.description ) {
					description = term.description;
				}
			}
		}

		if ( title ) {
			el = ( <PageHeader title={ title } description={ description } /> );
		}

		return el;
	}

	renderNavigation() {
		const { archive, location, match, query } = this.props;

		if ( ! archive.items.length ) {
			return null;
		}

		const { currentPage, hasMore } = archive;
		const args = {
			hasMore,
			currentPage,
			query,
			path: location.pathname,
			params: match.params,
		};

		const prevLink = getAdjacentLink( false, args );
		const nextLink = getAdjacentLink( true, args );

		if ( ! ( prevLink || nextLink ) ) {
			return null;
		}

		return <ContentNavigation { ...{ prevLink, nextLink } } />;
	}

	renderEmpty() {
		const { searchTerm } = this.props.archive;
		let args;

		if ( searchTerm ) {
			args = { content: 'It seems we can’t find what you’re looking for. Perhaps try another search?' };
		} else {
			args = {
				title: 'Nothing Found.',
				content: 'It seems we can’t find what you’re looking for. Perhaps searching can help.',
			};
		}

		return (
			<EntryEmpty { ...args } />
		);
	}

	renderArchive() {
		const { items } = this.props.archive;

		if ( items.length ) {
			return items.map( item => <Entry key={ item.id } data={ item } isSingle={ false } /> );
		}

		return this.renderEmpty();
	}

	render() {
		const { archive } = this.props;
		const { isFetching } = archive;

		if ( isFetching ) {
			return ( <Spinner /> );
		}

		return (
			<div id="primary" className="content-area">
				{ this.renderHelMet() }

				<main id="main" className="site-main" role="main">
					{ this.renderTitle() }
					{ this.renderArchive() }
					{ this.renderNavigation() }
				</main>
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		archive: state.archive,
		query: parse( ownProps.location.search, {
			ignoreQueryPrefix: true,
		} ),
	};
}

export default connect( mapStateToProps )( Index );
