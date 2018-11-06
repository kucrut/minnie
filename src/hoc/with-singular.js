import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withSingular( args ) {
	const {
		need = [],
		mapStateToProps = () => ( {} ),
		fetchData = () => {},
	} = args;

	const finalMapStateToProps = ( state, ownProps ) => ( {
		info: state.info,
		singular: state.singular,
		slug: ownProps.match.params.slug,
		...mapStateToProps(  state, ownProps  ),
	} );

	return Component => {
		class WithSingular extends React.Component {

			static need = need;

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

				dispatch( fetchData( args ) );
			}

			render() {
				return <Component { ...this.props } />;
			}
		}

		return connect( finalMapStateToProps )( WithSingular );
	};
}
