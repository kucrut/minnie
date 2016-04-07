import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	query: ( state = {} ) => state,
	routing
});

export default rootReducer;
