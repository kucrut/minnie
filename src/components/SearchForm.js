import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
	static propTypes = {
		siteUrl: PropTypes.string.isRequired,
		searchTerm: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );

		this.state = {
			searchTerm: decodeURIComponent( props.searchTerm ),
		};
	}

	render() {
		const { history, siteUrl } = this.props;
		const { searchTerm } = this.state;
		const formProps = {
			role: 'search',
			method: 'get',
			className: 'search-form',
			action: siteUrl,
			onSubmit: e => {
				e.preventDefault();
				history.push( `/?s=${ encodeURIComponent( searchTerm ) }` );
			},
		};
		const inputProps = {
			name: 's',
			type: 'search',
			className: 'search-field',
			placeholder: 'Search…',
			value: searchTerm,
			onChange: e => this.setState( {
				searchTerm: e.target.value,
			} ),
		};

		return (
			<form { ...formProps }>
				<label>
					<span className="screen-reader-text">Search for:</span>
					<input { ...inputProps } />
				</label>
				<button className="search-submit screen-reader-text" type="submit">Search</button>
			</form>
		);
	}
}

function mapStateToProps( state ) {
	return {
		siteUrl: state.info.siteUrl,
		searchTerm: state.archive.searchTerm,
	};
}

export default withRouter( connect( mapStateToProps )( SearchForm ) );
