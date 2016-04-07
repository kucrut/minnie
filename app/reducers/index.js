import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	routing: routerReducer
});

export default rootReducer;
