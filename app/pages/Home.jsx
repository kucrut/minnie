import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { fetchArchive } from 'actions/archive'
import Entry from 'components/Entry'
import Spinner from 'components/Spinner'


class Home extends Component {
	static need = [
		fetchArchive
	]

	fetchData() {
		fetchArchive()
	}

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
		const { isFetching } = this.props

		if ( ! isFetching ) {
			this.fetchData()
		}
		*/
	}

	/**
	 * Before changing page
	 *
	 * This is invoked on the client when the visitors requested a singular page
	 *     when he's viewing another.
	 *
	 * @param  {object} nextProps Next properties.
	 */
	componentWillReceiveProps( nextProps ) {
		/*
		const { isFetching } = nextProps.archive

		if ( ! isFetching ) {
			this.fetchData()
		}
		*/
	}

	render() {
		const { info, archive } = this.props
		const { isFetching, items } = archive

		if ( isFetching ) {
			return ( <Spinner /> )
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
	archive: PropTypes.object.isRequired
}

function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		archive: state.archive
	}
}

export default connect( mapStateToProps )( Home )
