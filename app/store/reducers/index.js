import { combineReducers } from 'redux';
import session from './session';
import info from './info';
import menu from './menu';
import ui from './ui';
import singular from './singular';
import archive from './archive';
import terms from './terms';
import comments from './comments';

// Combine reducers with routeReducer which keeps track of router state.
export default combineReducers( {
	session,
	info,
	menu,
	ui,
	singular,
	archive,
	terms,
	comments,
} );
