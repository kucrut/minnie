import { combineReducers } from 'redux';

import archive from './archive';
import comments from './comments';
import info from './info';
import menu from './menu';
import session from './session';
import singular from './singular';
import taxonomies from './taxonomies';
import terms from './terms';
import ui from './ui';

// Combine reducers with routeReducer which keeps track of router state.
export default combineReducers( {
	archive,
	comments,
	info,
	menu,
	session,
	singular,
	taxonomies,
	terms,
	ui,
} );
