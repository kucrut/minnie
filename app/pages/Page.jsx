import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPage } from 'actions/singular'

class Page extends Component {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchPage
	]

	fetchData( slug ) {
		this.props.dispatch( fetchPage( {slug} ) )
	}

	getContent() {
		return { __html: this.props.data.content.rendered }
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
		const { slug, data, isFetching } = this.props

		if ( ! isFetching && slug !== data.slug ) {
			this.fetchData( slug )
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
		const { slug, isFetching } = nextProps

		if ( ! isFetching && slug !== this.props.slug ) {
			this.fetchData( slug )
		}
	}

	/**
	 * Render singular page content
	 *
	 * TODO: Provide a 'loading' component.
	 * TODO: Provide a 'not found' component.
	 */
	render() {
		const { data, isFetching } = this.props

		if ( isFetching ) {
			return (
				<p>Loading&hellip;</p>
			)
		} else if ( ! data.id ) {
			return (
				<p>Not found. ;(</p>
			)
		}

		return (
			<div className="content">
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<article id={ `post-${ data.id }` } className="hentry">
							<header className="entry-header">
								<h1 className="entry-title">{ data.title.rendered }</h1>
							</header>
							<div className="entry-content" dangerouslySetInnerHTML={ this.getContent() } />
						</article>
					</main>
				</div>
			</div>
		)
	}
}

Page.propTypes = {
	slug: PropTypes.string.isRequired,
	data: PropTypes.object,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params

	return {
		slug: slug,
		...state.singular
	}
}

export default connect( mapStateToProps )( Page )
