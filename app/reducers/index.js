import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import info from 'reducers/info'

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	info,
	routing
});

export default rootReducer;
