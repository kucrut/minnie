import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import Helmet from 'react-helmet';

import { checkLastSession, checkSession } from 'actions/session';
import Spinner from 'components/Spinner';

class Login extends Component {
	static propTypes = {
		siteName: PropTypes.string.isRequired,
		isChecking: PropTypes.bool.isRequired,
		dispatch: PropTypes.func.isRequired,
		redirect: PropTypes.string,
	}

	constructor( props ) {
		super( props );

		this.state = {
			username: '',
			password: '',
		};

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentDidMount() {
		this.props.dispatch( checkLastSession() );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.user.id ) {
			nextProps.dispatch( push( nextProps.redirect ) );
		} else {
			// Show error.
		}
	}

	handleChange( e ) {
		const key = e.currentTarget.getAttribute( 'name' );

		this.setState( { [ key ]: e.currentTarget.value } );
	}

	handleSubmit( e ) {
		e.preventDefault();

		const { dispatch } = this.props;
		const { username, password } = this.state;

		dispatch( checkSession( username, password ) );
	}

	render() {
		const { siteName, isChecking } = this.props;
		const { username, password } = this.state;

		if ( isChecking ) {
			return (
				<div className="content">
					<Spinner />
				</div>
			);
		}

		return (
			<div className="content">
				<Helmet title="Log In" titleTemplate={ `%s | ${siteName}` } />

				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<form className="login" onSubmit={ this.handleSubmit }>
							<p>
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									id="username"
									name="username"
									value={ username }
									onChange={ this.handleChange }
								/>
							</p>
							<p>
								<label htmlFor="password">Password:</label>
								<input
									type="password"
									id="password"
									name="password"
									value={ password }
									onChange={ this.handleChange }
								/>
							</p>
							<p className="submit-row">
								<button type="submit">Log In</button>
							</p>
						</form>
					</main>
				</div>
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	const redirectUrl = get( ownProps, 'location.query.redirect' );

	return {
		siteName: state.info.name,
		isChecking: state.session.isChecking,
		user: state.session.user,
		redirect: redirectUrl || '/',
	};
}

export default connect( mapStateToProps )( Login );
