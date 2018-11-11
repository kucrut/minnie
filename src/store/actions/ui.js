import { UI_TOGGLE_SIDEBAR } from '../constants';

export default function toggleSidebar() {
	return ( dispatch, getState ) => {
		const expand = ! getState().ui.isSidebarExpanded;

		dispatch( {
			type: UI_TOGGLE_SIDEBAR,
			expand,
		} );
	};
}

export const closeSidebar = () => ( {
	type: UI_TOGGLE_SIDEBAR,
	expand: false,
} );
