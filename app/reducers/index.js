import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import info from 'reducers/info'
import menu from 'reducers/menu'
import ui from 'reducers/ui'
import singular from 'reducers/singular'

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	info,
	menu,
	ui,
	singular,
	routing
});

export default rootReducer;
