import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchArchive } from 'actions/archive'


class SearchForm extends Component {
	static propTypes = {
		apiUrl: PropTypes.string.isRequired,
		searchTerm: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props )

		this.state = {
			searchTerm: decodeURIComponent( props.searchTerm )
		}

		this.handleChange = this.handleChange.bind( this )
		this.handleSubmit = this.handleSubmit.bind( this )
	}

	handleChange( e ) {
		this.setState({ searchTerm: e.target.value });
	}

	handleSubmit( e ) {
		e.preventDefault()
		this.props.dispatch( push( `/?s=${ encodeURIComponent( this.state.searchTerm ) }` ) )
	}

	render() {
		const { apiUrl, searchTerm }  = this.state

		return (
			<form role="search" method="get" className="search-form" formAction={ apiUrl } onSubmit={ this.handleSubmit }>
				<label>
					<span className="screen-reader-text">Search for:</span>
					<input
						name="s"
						type="search"
						className="search-field"
						placeholder="Search…"
						value={ searchTerm }
						onChange={ this.handleChange } />
				</label>
				<button className="search-submit screen-reader-text" type="submit">Search</button>
			</form>
		)
	}
}

function mapStateToProps( state ) {
	return {
		apiUrl: state.info.apiUrl,
		searchTerm: state.archive.searchTerm
	}
}

export default connect( mapStateToProps )( SearchForm )
