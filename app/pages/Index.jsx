import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import he from 'he';
import { isEqual } from 'lodash';
import { getAdjacentLink } from 'helpers';
import { fetchArchive, fetchArchiveTerm } from 'actions/archive';
import ContentNavigation from 'components/ContentNavigation';
import Entry from 'components/Entry/Item';
import EntryEmpty from 'components/Entry/Empty';
import Spinner from 'components/Spinner';


class Index extends Component {
	static propTypes = {
		info:        PropTypes.object.isRequired,
		archive:     PropTypes.object.isRequired,
		query:       PropTypes.object.isRequired,
		route:       PropTypes.object.isRequired,
		routeParams: PropTypes.object.isRequired,
		dispatch:    PropTypes.func.isRequired
	}

	static need = [
		fetchArchive,
		fetchArchiveTerm
	]

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is an archive page)
	 * we need not do anything, because the data will be fetched automatically via
	 * `fetchComponentDataBeforeRender()`. However, when invoked on the client, we need
	 * to fetch the data first.
	 */
	componentWillMount() {
		const { archive, routeParams, query } = this.props;
		const { isFetching, fetchParams, currentPage } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign({}, routeParams, query );

		if ( 0 === currentPage || ! isEqual( params, fetchParams ) ) {
			this.fetchData( params );
		}
	}

	/**
	 * Before changing page
	 *
	 * This is invoked on the client when the visitor transitions between archive pages.
	 *
	 * @param  {object} nextProps Next properties.
	 */
	componentWillReceiveProps( nextProps ) {
		const { archive, routeParams, query } = nextProps;
		const { isFetching, fetchParams } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign({}, routeParams, query );

		if ( ! isEqual( params, fetchParams ) ) {
			this.fetchData( params );
		}
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
		const { routeParams, archive, info } =  this.props;
		const { term, searchTerm } = archive;

		let title = '';

		if ( term || searchTerm ) {
			if ( term ) {
				title = term.name;
			} else {
				title = `Search results for “${searchTerm}”`;
			}

			if ( routeParams.page ) {
				title = `${title} — Page ${routeParams.page}`;
			}

			title = `${title} | ${info.name}`;
		} else { // Home
			title = info.name;

			if ( routeParams.page ) {
				title = `${title} — Page ${routeParams.page}`;
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
		let el;

		if ( searchTerm ) {
			title = `Search results for “${searchTerm}”`;
		} else {
			if ( term && items.length ) {
				title = he.decode( term.name );
			}
		}

		if ( title ) {
			el = (
				<header className="page-header">
					<h1 className="page-title">{ title }</h1>
				</header>
			);
		}

		return el;
	}

	renderNavigation() {
		let el;

		if ( ! this.props.archive.items.length ) {
			return el;
		}

		const { archive, route, routeParams, query } = this.props;
		const { currentPage, hasMore } = archive;
		const args = {
			hasMore,
			currentPage,
			route,
			routeParams,
			query
		};

		let prevLink = getAdjacentLink( false, args );
		let nextLink = getAdjacentLink( true, args );

		if ( prevLink || nextLink ) {
			el = ( <ContentNavigation prevLink={ prevLink } nextLink={ nextLink } /> );
		}

		return el;
	}

	renderEmpty() {
		const { searchTerm } = this.props.archive;
		let args;

		if ( searchTerm ) {
			args = {
				content: 'It seems we can’t find what you’re looking for. Perhaps try another search?'
			};
		} else {
			args = {
				title:   'Nothing Found.',
				content: 'It seems we can’t find what you’re looking for. Perhaps searching can help.'
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
		const { isFetching } = this.props.archive;

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
		info:        state.info,
		archive:     state.archive,
		route:       ownProps.route,
		query:       ownProps.location.query,
		routeParams: ownProps.params
	};
}

export default connect( mapStateToProps )( Index );
