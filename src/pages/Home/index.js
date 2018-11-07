import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'he';
import { parse } from 'qs';
import { hot } from 'react-hot-loader'

import { fetchArchive, fetchArchiveTerm } from '../../store/actions/archive';
import Main from '../../containers/Main';
import PageHeader from '../../components/PageHeader';
import Entry from '../../components/Entry';
import EntryEmpty from '../../components/Entry/Empty';
import Spinner from '../../components/Spinner';
import ContentNavigation from '../../components/ContentNavigation';

class Index extends Component {
	static propTypes = {
		info: PropTypes.object.isRequired,
		archive: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	};

	static need = [
		fetchArchive,
		fetchArchiveTerm,
	];

	componentDidMount() {
		const { archive, url } = this.props;
		const { items } = archive;

		// TODO: Don't re-fetch on first mount and not items found.
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
	 * TODO: Maybe move this to reducer?
	 */
	createDocTitle() {
		const { archive, info } = this.props;
		const { currentPage, searchTerm, term } = archive;

		const addPageNum = title => {
			if ( currentPage > 1 ) {
				return `${ title } — Page ${ currentPage }`;
			}

			return title;
		};

		let title = '';

		if ( term || searchTerm ) {
			title = term ? term.name : `Search results for “${ searchTerm }”`;
			title = addPageNum( title );
			title = `${ title } | ${ info.name }`;
		} else { // Home
			title = addPageNum( info.name );
		}

		return decode( title );
	}

	/**
	 * Archive Title
	 *
	 * Unless we're displaying the homepage, we need to display the archive title,
	 * which is the term title ( `get_queried_object()` in WordPress ).
	 */
	renderTitle() {
		const { archive } = this.props;
		const { term, searchTerm, items } = archive;

		if ( term && items.length ) {
			return (
				<PageHeader
					title={ decode( term.name ) }
					description={ term.description || '' }
				/>
			);
		}

		const title = searchTerm
			? decode( `Search results for “${ searchTerm }”` )
			: 'Nothing Found.'

		return <PageHeader title={ title } />;
	}

	renderEmpty() {
		const { archive } = this.props;
		const { searchTerm } = archive;

		const content = searchTerm
			? 'It seems we can’t find what you’re looking for. Perhaps try another search?'
			: 'It seems we can’t find what you’re looking for. Perhaps searching can help.';

		return <EntryEmpty content={ content } />;
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
			return <Spinner />;
		}

		return (
			<Main title={ this.createDocTitle() }>
				{ this.renderTitle() }
				{ this.renderArchive() }
				{ ( nextLink || prevLink )
					? <ContentNavigation
						isSingle={ false }
						prevLink={ prevLink }
						nextLink={ nextLink }
					/> : null
				}
			</Main>
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

const connectedIndex = connect( mapStateToProps )( Index );

export default hot( module )( connectedIndex );
