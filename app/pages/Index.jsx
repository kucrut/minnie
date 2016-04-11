import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEqual } from 'lodash'
import { normalizeParams } from 'helpers.js'
import { fetchArchive } from 'actions/archive'
import Entry from 'components/Entry'
import EntryEmpty from 'components/EntryEmpty'
import Spinner from 'components/Spinner'


class Home extends Component {
	static need = [
		fetchArchive
	]

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is a singular page)
	 *     we need not do anything, because the data will be fetched automatically via
	 *     `fetchComponentDataBeforeRender()`
	 * However, when invoked on the client, we need to fetch the data if the one in the
	 *     store doesn't match the requested page.
	 */
	componentWillMount() {
		/*
		const { isFetching, params } = this.props

		if ( ! isFetching ) {
			fetchArchive( params )
		}
		*/
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
					{ items.map( item => <Entry key={ item.id } data={ item } isSingle={ false } /> ) }
				</main>
			</div>
		)
	}
}

Home.propTypes = {
	info: PropTypes.object.isRequired,
	archive: PropTypes.object.isRequired,
	routeParams: PropTypes.object.isRequired
}

function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		archive: state.archive,
		routeParams: normalizeParams( ownProps.params )
	}
}

export default connect( mapStateToProps )( Home )
