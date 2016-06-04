import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchPreview } from 'actions/singular';
import he from 'he';
import Helmet from 'react-helmet';
import Spinner from 'components/Spinner';
import Entry from 'components/Entry/Item';
import NotFound from 'pages/404';


class Preview extends Component {

	static propTypes = {
		singular: PropTypes.object.isRequired,
		session:  PropTypes.object.isRequired,
		path:     PropTypes.string.isRequired,
		type:     PropTypes.string.isRequired,
		id:       PropTypes.number.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	static displayName = 'Preview'

	constructor( props ) {
		const { id, singular } = props;

		super( props );

		/**
		 * State
		 *
		 * When the requested `id` is the same as the data's `id`,
		 * it means this component is rendered by the server.
		 *
		 * @type {Object}
		 * @see  {@link https://github.com/reactjs/react-redux/issues/210}
		 */
		this.state = {
			isWaitingForProps: ( id !== singular.data.id )
		};
	}

	componentWillMount() {
		const { session, path, singular, type, id, dispatch } = this.props;
		const { data, isFetching } = singular;
		const { user, token } = session;

		if ( ! token || ! user.id ) {
			dispatch( push( `/login?redirect=${encodeURI( path )}` ) );
			return;
		}

		if ( isFetching ) {
			this.setState({ isWaitingForProps: false });
			return;
		}

		if ( id !== data.id ) {
			this.fetchData( type, id );
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
		const { type, id, singular: { isFetching } } = nextProps;

		if ( isFetching ) {
			this.setState({ isWaitingForProps: false });
			return;
		}

		if ( id !== this.props.id ) {
			this.fetchData( type, id );
		}
	}

	fetchData( type, id ) {
		this.props.dispatch( fetchPreview({ type, id }) );
	}

	render() {
		const { singular: { isFetching, data } } = this.props;
		let title;

		if ( isFetching || this.state.isWaitingForProps ) {
			return ( <Spinner /> );
		} else if ( ! data.id ) {
			return ( <NotFound /> );
		}

		title = data.title.rendered ? data.title.rendered : data.title.from_content;
		title = he.decode( title );

		return (
			<div className="content">
				<Helmet title={ title } titleTemplate={ 'Preview: %s' } />

				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<Entry data={ data } isSingle={ true } />
					</main>
				</div>
			</div>
		);
	}
}

export function mapStateToProps( state, ownProps ) {
	const { type, id } = ownProps.params;

	return {
		singular: state.singular,
		session:  state.session,
		path:     ownProps.location.pathname,
		id:       parseInt( id, 10 ),
		type
	};
}

export default connect( mapStateToProps )( Preview );
