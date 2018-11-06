import React from 'react';

import { fetchPage } from '../../store/actions/singular';
import withSingularData from '../../higher-order/with-singular-data';
import Singular from '../../containers/Singular';
import Entry from '../../components/Entry/Item';

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPage( args ) );
}

function Page( props ) {
	const { singular } = props;
	const { data } = singular;

	return (
		<Singular { ...props }>
			<Entry isSingle data={ data } />
		</Singular>
	)
}

export default withSingularData( {
	fetchData,
	need: [ fetchPage ],
} )( Page );
