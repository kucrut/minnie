import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEqual } from 'lodash'
import { fetchArchive } from 'actions/archive'
import Entry from 'components/Entry'
import EntryEmpty from 'components/EntryEmpty'
import Spinner from 'components/Spinner'


class Index extends Component {
	static need = [
		fetchArchive
	]

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is an archive page)
	 * we need not do anything, because the data will be fetched automatically via
	 * `fetchComponentDataBeforeRender()`. However, when invoked on the client
	 * (archive.currentPage = -1), we need to fetch the data first.
	 */
	componentWillMount() {
		const { isFetching, dispatch, routeParams, archive } = this.props

		if ( ! isFetching && -1 === archive.currentPage ) {
			dispatch( fetchArchive( routeParams ) )
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
		const { isFetching, dispatch, routeParams } = nextProps

		if ( ! isFetching && ! isEqual( routeParams, this.props.routeParams ) ) {
			dispatch( fetchArchive( routeParams ) )
		}
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
				<h1 className="page-title">{ term.name }</h1>
			</header>
		)
	}

	render() {
		const { info, archive } = this.props
		const { isFetching, items } = archive

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
				<Helmet title={ `${ info.name }` } />

				<main id="main" className="site-main" role="main">
					{ this.renderArchiveTitle() }
					{ items.map( item => <Entry key={ item.id } data={ item } isSingle={ false } /> ) }
				</main>
			</div>
		)
	}
}

Index.propTypes = {
	info: PropTypes.object.isRequired,
	archive: PropTypes.object.isRequired,
	routeParams: PropTypes.object.isRequired
}

function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		archive: state.archive,
		routeParams: ownProps.params
	}
}

export default connect( mapStateToProps )( Index )
