import {
	GET_MENU_REQUEST,
	GET_MENU_SUCCESS,
	GET_MENU_FAILURE,
} from '../constants';

const initialState = {
	menus: {},
	isFetching: false,
};

export default function menu( state = initialState, action ) {
	switch ( action.type ) {
		case GET_MENU_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case GET_MENU_SUCCESS:
			return {
				...state,
				isFetching: false,
				menus: {
					...state.menus,
					[ action.location ]: action.req.data,
				},
			};

		case GET_MENU_FAILURE:
			return {
				...state,
				isFetching: false,
			};

		default:
			return state;
	}
}
