import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
	static propTypes = {
		searchTerm: PropTypes.string.isRequired,
		siteUrl: PropTypes.string.isRequired,
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
			action: siteUrl,
			className: 'search-form',
			method: 'get',
			role: 'search',
			onSubmit: e => {
				e.preventDefault();
				history.push( `/?s=${ encodeURIComponent( searchTerm ) }` );
			},
		};
		const inputProps = {
			className: 'search-field',
			name: 's',
			placeholder: 'Search…',
			type: 'search',
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
		searchTerm: state.archive.searchTerm,
		siteUrl: state.info.siteUrl,
	};
}

export default withRouter( connect( mapStateToProps )( SearchForm ) );
