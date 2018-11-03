class Preview extends Component {

	componentWillMount() {
		const { singular, type, id } = this.props;
		const { data, isFetching } = singular;

		if ( isFetching ) {
			this.setState( { isWaitingForProps: false } );
			return;
		}

		if ( id !== data.id ) {
			this.fetchData( type, id );
		}
	}

	/**
	 * Before changing page
	 *
	 * This is invoked on the client when the visitors requested a singular page
	 *     when he's viewing another.
	 *
	 * @param  {object} nextProps Next properties.
	 */
	componentWillReceiveProps( nextProps ) {
		const { type, id, singular: { isFetching } } = nextProps;

		if ( isFetching ) {
			this.setState( { isWaitingForProps: false } );
			return;
		}

		if ( id !== this.props.id ) {
			this.fetchData( type, id );
		}
	}
}
