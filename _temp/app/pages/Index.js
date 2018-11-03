import { isEqual } from 'lodash';

import { getAdjacentLink } from '../helpers';
import ContentNavigation from '../components/ContentNavigation';

class Index extends Component {
	static propTypes = {
		// route: PropTypes.object.isRequired,
		// routeParams: PropTypes.object.isRequired,
	}

	/**
	 * Before mount
	 *
	 * When this is invoked on the server (the initial page visited is an archive page)
	 * we need not do anything, because the data will be fetched automatically via
	 * `fetchComponentDataBeforeRender()`. However, when invoked on the client, we need
	 * to fetch the data first.
	 */
	componentWillMountX() {
		const { archive, routeParams, query } = this.props;
		const { isFetching, fetchParams, currentPage } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign( {}, routeParams, query );

		if ( currentPage === 0 || ! isEqual( params, fetchParams ) ) {
			// this.fetchData( params );
		}
	}

	/**
	 * Before changing page
	 *
	 * This is invoked on the client when the visitor transitions between archive pages.
	 *
	 * @param  {object} nextProps Next properties.
	 */
	componentWillReceivePropsX( nextProps ) {
		const { archive, routeParams, query } = nextProps;
		const { isFetching, fetchParams } = archive;

		if ( isFetching ) {
			return;
		}

		const params = Object.assign( {}, routeParams, query );

		if ( ! isEqual( params, fetchParams ) ) {
			this.fetchData( params );
		}
	}

	componentDidUpdate( prevProps ) {
		const { archive, location, match, query } = this.props;
		const { location: prevLocation } = prevProps;
		const { isFetching } = archive;

		if ( isFetching ) {
			return;
		}

		if ( isEqual( prevLocation, location ) ) {
			return;
		}

		this.fetchData( {
			...match.params,
			...query,
		} );
	}

	renderNavigation() {
		const { archive, location, match, query } = this.props;

		if ( ! archive.items.length ) {
			return null;
		}

		const { currentPage, hasMore } = archive;
		const args = {
			hasMore,
			currentPage,
			query,
			path: location.pathname,
			params: match.params,
		};

		const prevLink = getAdjacentLink( false, args );
		const nextLink = getAdjacentLink( true, args );

		if ( ! ( prevLink || nextLink ) ) {
			return null;
		}

		return <ContentNavigation { ...{ prevLink, nextLink } } />;
	}

}
