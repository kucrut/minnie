import React, { Component, PropTypes } from 'react'
import he from 'he'
import Helmet from 'react-helmet'
import NotFound from 'pages/404'
import Spinner from 'components/Spinner'
import Entry from 'components/Entry'

export default class _Singular extends Component {

	static propTypes = {
		slug: PropTypes.string.isRequired,
		info: PropTypes.object.isRequired,
		singular: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props )

		/**
		 * State
		 *
		 * When `slug` exists, it means this component is rendered by the server.
		 *
		 * @type {Object}
		 * @see  {@link https://github.com/reactjs/react-redux/issues/210}
		 */
		this.state = {
			isWaitingForProps: ! props.singular.data.slug
		}
	}

	/**
	 * Must be overriden in subclass
	 */
	fetchData( slug ) {}

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
		const { slug, singular } = this.props
		const { data, isFetching } = singular

		if ( isFetching ) {
			this.setState({ isWaitingForProps: false })
			return
		}

		if ( slug !== data.slug ) {
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
		const { slug, singular } = nextProps
		const { data, isFetching } = singular

		if ( isFetching ) {
			this.setState({ isWaitingForProps: false })
			return
		}

		if ( slug === this.props.slug ) {
			return
		}

		this.fetchData( slug )
	}

	/**
	 * Render singular page content
	 *
	 * TODO: Render meta, comments, etc.
	 */
	render() {
		const { info, singular } = this.props
		const { data, isFetching } = singular
		let title

		if ( isFetching || this.state.isWaitingForProps ) {
			return ( <Spinner /> )
		} else if ( ! data.id ) {
			return ( <NotFound /> )
		}

		title = title = data.title.rendered ? data.title.rendered : data.title.from_content

		return (
			<div className="content">
				<Helmet
					title={ he.decode( title ) }
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
