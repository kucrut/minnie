import {
	GET_MENU_REQUEST,
	GET_MENU_SUCCESS,
	GET_MENU_FAILURE
} from 'constants/index';


const initialState = {
	menus:      {},
	isFetching: false
};

export default function menu( state = initialState, action ) {
	switch ( action.type ) {
		case GET_MENU_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case GET_MENU_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				menus:      Object.assign({}, state.menus, {
					[ action.location ]: action.req.data
				})
			});

		case GET_MENU_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			});

		default:
			return state;
	}
}
