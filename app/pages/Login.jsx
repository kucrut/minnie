import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Helmet from 'react-helmet';
import { checkSession } from 'actions/session';

class Login extends Component {
	static propTypes = {
		siteName:   PropTypes.string.isRequired,
		isChecking: PropTypes.bool.isRequired,
		dispatch:   PropTypes.func.isRequired
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

	componentWillReceiveProps( nextProps, nextState ) {
		if ( nextProps.user.id ) {
			nextProps.dispatch( push( '/' ) );
		} else {
			// Show error.
		}
	}

	handleChange( e ) {
		const key = e.currentTarget.getAttribute( 'name' );

		this.setState({
			[ key ]: e.currentTarget.value
		});
	}

	handleSubmit( e ) {
		e.preventDefault();

		const { dispatch } = this.props;
		const { username, password } = this.state;

		dispatch( checkSession( username, password ) );
	}

	render() {
		const { siteName, isChecking, user } = this.props;
		const { username, password } = this.state;
		const btnAttr = ! isChecking && username && password ? {} : { disabled: 'disabled' };

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
								<button type="submit" { ...btnAttr }>Log In</button>
							</p>
						</form>
					</main>
				</div>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		siteName:   state.info.name,
		isChecking: state.session.isChecking,
		user:       state.session.user
	};
}

export default connect( mapStateToProps )( Login );
