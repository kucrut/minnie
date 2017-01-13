import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import session from 'reducers/session';
import info from 'reducers/info';
import menu from 'reducers/menu';
import ui from 'reducers/ui';
import singular from 'reducers/singular';
import archive from 'reducers/archive';
import terms from 'reducers/terms';
import comments from 'reducers/comments';
import galleries from 'reducers/galleries';

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
	galleries,
	routing,
} );
