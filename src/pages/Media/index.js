import React from 'react';

import { fetchMedia } from '../../store/actions/singular';
import withSingularData from '../../higher-order/with-singular-data';
import Singular from '../../containers/Singular';
import ContentNavigation from '../../components/ContentNavigation';
import Entry from '../../components/Entry/Item';

function mapStateToProps( state ) {
	return {
		user: state.session.user,
	};
}

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchMedia( args ) );
}

function Media( props ) {
	const { singular } = props;
	const { data } = singular;
	const { parent_post } = data;

	return (
		<Singular { ...props }>
			<Entry isSingle data={ data } />
			<ContentNavigation
				isSingle
				prevLink={ parent_post.link }
				prevText={ parent_post.title.rendered }
			/>
		</Singular>
	);
}

export default withSingularData( {
	fetchData,
	mapStateToProps,
	need: [ fetchMedia ],
} )( Media );