import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import info from 'reducers/info'
import menu from 'reducers/menu'
import singular from 'reducers/singular'

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	info,
	singular,
	menu,
	routing
});

export default rootReducer;
