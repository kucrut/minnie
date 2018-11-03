import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import he from 'he';
import Helmet from 'react-helmet';

import fetchPreview from '../actions/store/preview';
import Spinner from '../components/Spinner';
import Entry from '../components/Entry/Item';
import NotFound from './404';

class Preview extends Component {

	static propTypes = {
		singular: PropTypes.object.isRequired,
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		dispatch: PropTypes.func.isRequired,
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
		this.state = { isWaitingForProps: ( id !== singular.data.id ) };
	}

	fetchData( type, id ) {
		this.props.dispatch( fetchPreview( {
			type,
			id,
		} ) );
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
		id: parseInt( id, 10 ),
		type,
	};
}

export default connect( mapStateToProps )( Preview );
