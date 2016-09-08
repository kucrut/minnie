import {
	GALLERY_ADD,
	GALLERY_RESET,
	GALLERY_OPEN,
	GALLERY_CLOSE
} from 'constants/index';

const initialState = {
	groups:       [],
	activeId:     '',
	startIndex:   -1,
	clickedThumb: ''
};

export default function galleries( state = initialState, action ) {
	switch ( action.type ) {
		case '@@router/LOCATION_CHANGE':
		case GALLERY_RESET:
			return initialState;

		case GALLERY_ADD:
			return Object.assign({}, state, {
				groups: state.groups.concat( action.gallery )
			});

		case GALLERY_OPEN:
			return Object.assign({}, state, {
				activeId:     action.id,
				startIndex:   action.index,
				clickedThumb: action.thumb
			});

		case GALLERY_CLOSE:
			return Object.assign({}, state, {
				activeId:     initialState.activeId,
				startIndex:   initialState.startIndex,
				clickedThumb: initialState.clickedThumb
			});

		default:
			return state;
	}
}
