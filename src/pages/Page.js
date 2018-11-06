import withSingularData from '../higher-order/with-singular-data';
import Singular from '../containers/Singular';

import { fetchPage } from '../store/actions/singular';

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPage( args ) );
}

export default withSingularData( {
	fetchData,
	need: [ fetchPage ],
	displayName: 'Page',
} )( Singular );
