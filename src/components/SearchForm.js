import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchForm extends Component {
	static propTypes = {
		siteUrl: PropTypes.string.isRequired,
		searchTerm: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );

		this.state = { searchTerm: decodeURIComponent( props.searchTerm ) };

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleChange( e ) {
		this.setState( { searchTerm: e.target.value } );
	}

	handleSubmit( e ) {
		e.preventDefault();
		// this.props.dispatch( push( `/?s=${encodeURIComponent( this.state.searchTerm )}` ) );
	}

	render() {
		const { searchTerm } = this.state;
		const { siteUrl }  = this.props;
		const formProps = {
			role: 'search',
			method: 'get',
			className: 'search-form',
			action: siteUrl,
			onSubmit: this.handleSubmit,
		};
		const inputProps = {
			name: 's',
			type: 'search',
			className: 'search-field',
			placeholder: 'Search…',
			value: searchTerm,
			onChange: this.handleChange,
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

export default connect( mapStateToProps )( SearchForm );
