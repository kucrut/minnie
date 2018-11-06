import withSingularData from '../higher-order/with-singular-data';
import Singular from '../containers/Singular';

import { fetchPage } from '../store/actions/singular';

const fetchData = props => {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPage( args ) );
}

const Page = withSingularData( {
	fetchData,
	need: [ fetchPage ],
} )( Singular );

Page.displayName = 'Page';

export default Page;
