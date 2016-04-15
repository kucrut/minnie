import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import info from 'reducers/info'
import menu from 'reducers/menu'
import ui from 'reducers/ui'
import singular from 'reducers/singular'
import archive from 'reducers/archive'
import terms from 'reducers/terms'

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
	info,
	menu,
	ui,
	singular,
	archive,
	terms,
	routing
})

export default rootReducer
