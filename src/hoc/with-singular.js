import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withSingular( fetcher ) {
	const mapStateToProps = ( state, ownProps ) => ( {
		info: state.info,
		singular: state.singular,
		slug: ownProps.match.params.slug,
		// user: state.session.user,
	} );

	return WrappedComponent => {
		class WithSingular extends Component {

			static need = [ fetcher ];

			static propTypes = {
				info: PropTypes.object.isRequired,
				singular: PropTypes.object.isRequired,
				slug: PropTypes.string.isRequired,
			}

			componentDidMount() {
				const { slug, singular } = this.props;
				const { data } = singular;

				if ( data.slug !== slug ) {
					this.fetchData();
				}
			}

			componentDidUpdate( prevProps ) {
				const { slug, singular } = this.props;
				const { isFetching } = singular;

				if ( isFetching ) {
					return;
				}

				if ( prevProps.slug !== slug ) {
					this.fetchData();
				}
			}

			fetchData() {
				const { dispatch, slug } = this.props;
				const args = {
					params: { slug },
				};

				dispatch( fetcher( args ) );
			}

			render() {
				return <WrappedComponent { ...this.props } />;
			}
		}

		return connect( mapStateToProps )( WithSingular );
	};
}
