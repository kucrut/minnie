import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import he from 'he';
import Helmet from 'react-helmet';

import NotFound from './404';
import Spinner from '../components/Spinner';
import Entry from '../components/Entry/Item';

import { fetchPage } from '../store/actions/singular';

class Page extends Component {

	static need = [ fetchPage ]

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
		dispatch( fetchPage( { slug } ) );
	}

	render() {
		const { info, singular } = this.props;
		const { data, isFetching } = singular;
		let title;

		if ( isFetching ) {
			return ( <Spinner /> );
		}

		if ( ! data.id ) {
			return ( <NotFound /> );
		}

		title = data.title.rendered ? data.title.rendered : data.title.from_content;
		title = he.decode( title );

		return (
			<div className="content">
				<Helmet
					title={ title }
					titleTemplate={ `%s | ${info.name}` }
				/>

				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<Entry data={ data } isSingle={ true } />
						{/* this.renderNavigation() */}
						{/* this.renderComments() */}
					</main>
				</div>
			</div>
		);
	}
}

export function mapStateToProps( state, ownProps ) {
	return {
		info: state.info,
		singular: state.singular,
		slug: ownProps.match.params.slug,
		// user: state.session.user,
	};
}

export default connect( mapStateToProps )( Page );
