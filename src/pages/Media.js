import React from 'react';
import { connect } from 'react-redux';

import { fetchMedia } from '../store/actions/singular';
import ContentNavigation from '../components/ContentNavigation';
import _Singular from './_Singular';

class Media extends _Singular {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [ fetchMedia ]

	static displayName = 'Media';

	fetchData( slug ) {
		this.props.dispatch( fetchMedia( { slug } ) );
	}

	renderNavigation() {
		const { parent_post } = this.props.singular.data;

		return (
			<ContentNavigation
				isSingle={ true }
				prevLink={ parent_post.link }
				prevText={ parent_post.title.rendered }
			/>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params;

	return {
		info: state.info,
		singular: state.singular,
		user: state.session.user,
		slug,
	};
}

export default connect( mapStateToProps )( Media );
