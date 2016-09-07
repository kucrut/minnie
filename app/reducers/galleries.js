import { GALLERY_ADD, GALLERY_RESET } from 'constants/index';

const initialState = [];

export default function galleries( state = initialState, action ) {
	switch ( action.type ) {
		case '@@router/LOCATION_CHANGE':
		case GALLERY_RESET:
			return initialState;

		case GALLERY_ADD:
			return state.concat( action.gallery );

		default:
			return state;
	}
}
