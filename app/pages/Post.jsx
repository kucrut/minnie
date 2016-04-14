import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { fetchPost } from 'actions/singular'
import NotFound from 'pages/404'
import Spinner from 'components/Spinner'
import Entry from 'components/Entry'

class Post extends Component {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchPost
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
		const { slug, data, isFetching, dispatch } = this.props

		if ( ! isFetching && slug !== data.slug ) {
			dispatch( fetchPost({ slug }) )
		}
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
		const { slug, isFetching, dispatch } = nextProps

		if ( ! isFetching && slug !== this.props.slug ) {
			dispatch( fetchPost({ slug }) )
		}
	}

	/**
	 * Render singular page content
	 *
	 * TODO: Render meta, comments, etc.
	 */
	render() {
		const { info, data, isFetching } = this.props
		let title = data.title.rendered ? data.title.rendered : data.title.from_content

		if ( isFetching ) {
			return ( <Spinner /> )
		} else if ( ! data.id ) {
			return ( <NotFound /> )
		}

		return (
			<div className="content">
				<Helmet
					title={ title }
					titleTemplate={ `%s | ${ info.name }` }
				/>

				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<Entry data={ data } isSingle={ true } />
					</main>
				</div>
			</div>
		)
	}
}

Post.propTypes = {
	slug: PropTypes.string.isRequired,
	info: PropTypes.object.isRequired,
	data: PropTypes.object,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params

	return {
		slug: slug,
		info: state.info,
		...state.singular
	}
}

export default connect( mapStateToProps )( Post )
