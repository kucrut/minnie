import { collectItems } from '../../api/utils';
import {
	GET_TAXONOMIES_REQUEST,
	GET_TAXONOMIES_SUCCESS,
	GET_TAXONOMIES_FAILURE,
} from '../constants';

const initialState = {
	items: [],
	isFetching: false,
};

export default function taxonomies( state = initialState, action ) {
	switch ( action.type ) {
		case GET_TAXONOMIES_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case GET_TAXONOMIES_SUCCESS:
			return {
				...state,
				isFetching: false,
				items: collectItems( action.req.data ),
			};

		case GET_TAXONOMIES_FAILURE:
			return {
				...state,
				isFetching: false,
			};

		default:
			return state;
	}
}
