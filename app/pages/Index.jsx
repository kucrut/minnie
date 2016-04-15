import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEqual, forEach } from 'lodash'
import { getAdjacentLink } from 'helpers.js'
import { fetchArchive, fetchArchiveTerm } from 'actions/archive'
import ArchiveNavigation from 'components/ArchiveNavigation'
import Entry from 'components/Entry'
import EntryEmpty from 'components/EntryEmpty'
import Spinner from 'components/Spinner'


class Index extends Component {
	static need = [
		fetchArchive,
		fetchArchiveTerm
	]

	fetchData( params ) {
		const { dispatch } = this.props

		dispatch( fetchArchive( params ) )
		dispatch( fetchArchiveTerm( params ) )
	}

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is an archive page)
	 * we need not do anything, because the data will be fetched automatically via
	 * `fetchComponentDataBeforeRender()`. However, when invoked on the client
	 * (archive.currentPage = -1), we need to fetch the data first.
	 */
	componentWillMount() {
		const { archive, dispatch, routeParams } = this.props

		if ( ! archive.isFetching && -1 === archive.currentPage ) {
			this.fetchData( routeParams )
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
		const { archive, dispatch, routeParams } = nextProps

		if ( ! archive.isFetching && ! isEqual( routeParams, this.props.routeParams ) ) {
			this.fetchData( routeParams )
		}
	}

	/**
	 * Document title
	 *
	 * TODO: Maybe fetch this from SEO plugin?
	 */
	renderHelMet() {
		const { routeParams, archive, info } =  this.props
		const { isHome, term } = archive

		let title = ''

		if ( term ) {
			title = term.name

			if ( routeParams.page ) {
				title = `${ title } — Page ${ routeParams.page }`
			}

			title = `${ title } | ${ info.name }`
		} else { // Home
			title = info.name

			if ( routeParams.page ) {
				title = `${ title } — Page ${ routeParams.page }`
			}
		}

		return (
			<Helmet title={ title } />
		)
	}

	/**
	 * Archive Title
	 *
	 * Unless we're displaying the homepage, we need to display the archive title,
	 * which is the term title ( `get_queried_object()` in WordPress ).
	 */
	renderArchiveTitle() {
		const { isHome, term } = this.props.archive

		if ( isHome || ! term ) {
			return
		}

		return (
			<header className="page-header">
				<h1 className="page-title" dangerouslySetInnerHTML={{ __html: term.name }} />
			</header>
		)
	}

	renderNavigation() {
		const { archive, route, routeParams } = this.props
		const { currentPage, hasMore } = archive
		const args = {
			hasMore,
			currentPage,
			route,
			routeParams
		}

		let prevLink = getAdjacentLink( false, args )
		let nextLink = getAdjacentLink( true, args )

		if ( prevLink || nextLink ) {
			return ( <ArchiveNavigation prevLink={ prevLink } nextLink={ nextLink } /> )
		}
	}

	render() {
		const { archive, route, routeParams } = this.props
		const { isFetching, items, hasMore, currentPage } = archive

		if ( isFetching ) {
			return ( <Spinner /> )
		} else if ( ! items.length ) {
			return (
				<EntryEmpty
					title="Nothing Found."
					content="It seems we can’t find what you’re looking for. Perhaps searching can help."
				/>
			)
		}

		return (
			<div id="primary" className="content-area">
				{ this.renderHelMet() }

				<main id="main" className="site-main" role="main">
					{ this.renderArchiveTitle() }
					{ items.map( item => <Entry key={ item.id } data={ item } isSingle={ false } /> ) }
					{ this.renderNavigation() }
				</main>
			</div>
		)
	}
}

Index.propTypes = {
	info: PropTypes.object.isRequired,
	archive: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
	routeParams: PropTypes.object.isRequired
}

function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		archive: state.archive,
		route: ownProps.route,
		routeParams: ownProps.params
	}
}

export default connect( mapStateToProps )( Index )
