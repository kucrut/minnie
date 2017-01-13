import { UI_TOGGLE_SIDEBAR } from 'constants/index';

export default function toggleSidebar() {
	return ( dispatch, getState ) => {
		const expand = ! getState().ui.isSidebarExpanded;

		dispatch( {
			type: UI_TOGGLE_SIDEBAR,
			expand,
		} );
	};
}
