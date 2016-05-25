import { GET_SESSION_REQUEST, GET_SESSION_SUCCESS, GET_SESSION_FAILURE } from 'constants/index';

const initialState = {
	isChecking: false,
	token:      '',
	user:       {}
};

export default function session( state = initialState, action ) {
	switch ( action.type ) {
		case GET_SESSION_REQUEST:
			return Object.assign({}, state, {
				isChecking: true
			});

		case GET_SESSION_SUCCESS:
			return Object.assign({}, state, {
				isChecking: false,
				token:      action.token,
				user:       action.req.data
			});

		case GET_SESSION_FAILURE:
			return initialState;

		default:
			return state;
	}
}
