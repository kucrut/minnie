import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDisplayName } from '../utils';
import NotFound from '../../pages/404';
import Spinner from '../../components/Spinner';

export default function withSingular( args ) {
	const {
		displayName = '',
		fetchData = () => {},
		mapStateToProps = () => ( {} ),
		need = [],
	} = args;

	const finalMapStateToProps = ( state, ownProps, ...args ) => ( {
		info: state.info,
		singular: state.singular,
		slug: ownProps.match.params.slug,
		...mapStateToProps( state, ownProps, ...args ),
	} );

	return Component => {
		class WithSingularData extends React.Component {

			static displayName = displayName || `WithSingularData(${ getDisplayName( Component ) })`;

			static need = need;

			static propTypes = {
				info: PropTypes.object.isRequired,
				singular: PropTypes.object.isRequired,
				slug: PropTypes.string.isRequired,
			};

			componentDidMount() {
				const { slug, singular } = this.props;
				const { data } = singular;

				if ( data.slug !== slug ) {
					fetchData( this.props );
				}
			}

			componentDidUpdate( prevProps ) {
				const { slug, singular } = this.props;
				const { isFetching } = singular;

				if ( isFetching ) {
					return;
				}

				if ( prevProps.slug !== slug ) {
					fetchData( this.props );
				}
			}

			render() {
				const { slug, singular } = this.props;
				const { data, isFetching } = singular;

				if ( ( data.slug && data.slug !== slug ) || isFetching ) {
					return <Spinner />;
				}

				if ( data.id ) {
					return <Component { ...this.props } />;
				}

				return <NotFound />;
			}
		}

		return connect( finalMapStateToProps )( WithSingularData );
	};
}
