import { UI_TOGGLE_SIDEBAR } from 'constants/index';


export function toggleSidebar() {
	return ( dispatch, getState ) => {
		const expand = ! getState().ui.isSidebarExpanded;

		dispatch({
			type: UI_TOGGLE_SIDEBAR,
			expand
		});
	};
}
