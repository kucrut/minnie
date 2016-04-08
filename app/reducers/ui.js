import { UI_TOGGLE_SIDEBAR } from 'constants/index'


const initialState = {
	isSidebarExpanded: false
}

export default function ui( state = initialState, action ) {
	switch ( action.type ) {
		case UI_TOGGLE_SIDEBAR:
			return Object.assign( {}, state, {
				isSidebarExpanded: action.expand
			})

		default:
			return state
	}
}
