import {
	GET_INFO_REQUEST,
	GET_INFO_SUCCESS,
	GET_INFO_FAILURE,
} from '../constants';

const initialState = {
	apiRoot: '',
	siteUrl: '',
	lang: '',
	name: '',
	description: '',
	settings: {},
	isFetching: false,
};

export default function info( state = initialState, action ) {
	switch ( action.type ) {
		case GET_INFO_REQUEST:
			return {
				isFetching: true,
			};

		case GET_INFO_SUCCESS:
			return {
				...state,
				...action.req.data,
				isFetching: false,
			};

		case GET_INFO_FAILURE:
			return {
				isFetching: false,
			};

		default:
			return state;
	}
}
