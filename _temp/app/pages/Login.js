class Login extends Component {
	componentWillReceiveProps( nextProps ) {
		if ( nextProps.user.id ) {
			nextProps.dispatch( push( nextProps.redirect ) );
		} else {
			// Show error.
		}
	}
}
