import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import he from 'he';
import { parse } from 'qs';

import { fetchArchive, fetchArchiveTerm } from '../store/actions/archive';
import PageHeader from '../components/PageHeader';
import Entry from '../components/Entry/Item';
import EntryEmpty from '../components/Entry/Empty';
import Spinner from '../components/Spinner';
import ContentNavigation from '../components/ContentNavigation';

class Index extends Component {
	static propTypes = {
		info: PropTypes.object.isRequired,
		archive: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	static need = [
		fetchArchive,
		fetchArchiveTerm,
	]

	componentDidMount() {
		const { archive, url } = this.props;
		const { items } = archive;

		if ( ! items.length || archive.url !== url ) {
			this.fetchData();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.url !== prevProps.url ) {
			this.fetchData();
		}
	}

	fetchData() {
		const { dispatch, location, match, url } = this.props;
		const { search } = location;

		let { params } = match;
		if ( search ) {
			params = {
				...params,
				...parse( search, { ignoreQueryPrefix: true } ),
			};
		}

		dispatch( fetchArchiveTerm( params ) );
		dispatch( fetchArchive( {
			url,
			params,
		} ) );
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
		const { isFetching, nextLink, prevLink } = archive;

		if ( isFetching ) {
			return ( <Spinner /> );
		}

		return (
			<div id="primary" className="content-area">
				{ this.renderHelMet() }

				<main id="main" className="site-main" role="main">
					{ this.renderTitle() }
					{ this.renderArchive() }
					{ ( nextLink || prevLink )
						? <ContentNavigation
							isSingle={ false }
							prevLink={ prevLink }
							nextLink={ nextLink }
						/> : null
					}
				</main>
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	const { location } = ownProps;
	const { pathname, search } = location;

	return {
		info: state.info,
		archive: state.archive,
		url: pathname + search,
	};
}

export default connect( mapStateToProps )( Index );
