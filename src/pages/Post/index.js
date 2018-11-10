import React from 'react';
import { parse } from 'qs';
import { hot } from 'react-hot-loader'

import { fetchPost } from '../../store/actions/singular';
import withSingularData from '../../higher-order/with-singular-data';
import Comments from '../../components/Comments';
import Singular from '../../containers/Singular';
import Entry from '../../components/Entry';

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPost( args ) );
}

function mapStateToProps( state, ownProps ) {
	const query = parse( ownProps.location.search, { ignoreQueryPrefix: true } );

	return {
		query,
		comments: state.comments,
	};
}

function Post( props ) {
	const { singular } = props;
	const { data } = singular;

	return (
		<Singular { ...props }>
			<Entry isSingle data={ data } />
			<Comments />
		</Singular>
	)
}

const postWithSingularData = withSingularData( {
	fetchData,
	mapStateToProps,
	need: [ fetchPost ],
} )( Post )

export default hot( module )( postWithSingularData );
