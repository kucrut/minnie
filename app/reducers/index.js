import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import info from 'reducers/info'
import singular from 'reducers/singular'

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	info,
	singular,
	routing
});

export default rootReducer;
