import { connect } from 'react-redux';

import { fetchPage } from '../store/actions/singular';
import _Singular from './_Singular';

class Page extends _Singular {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [ fetchPage ]

	static displayName = 'Page'

	fetchData( slug ) {
		this.props.dispatch( fetchPage( { slug } ) );
	}
}

export function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		singular: state.singular,
		user: state.session.user,
		slug: ownProps.match.params.slug,
	};
}

export default connect( mapStateToProps )( Page );
