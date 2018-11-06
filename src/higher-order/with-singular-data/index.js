import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDisplayName } from '../utils';

export default function withSingular( args ) {
	const {
		need = [],
		mapStateToProps = () => ( {} ),
		fetchData = () => {},
		displayName = '',
	} = args;

	const finalMapStateToProps = ( state, ownProps ) => ( {
		info: state.info,
		singular: state.singular,
		slug: ownProps.match.params.slug,
		...mapStateToProps(  state, ownProps  ),
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
					fetchData( this.props )
				}
			}

			render() {
				return <Component { ...this.props } />;
			}
		}

		return connect( finalMapStateToProps )( WithSingularData );
	};
}
