import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE
} from 'constants/index';

const initialThreadState = {
	items:       [],
	hasMore:     false,
	currentPage: 0,
	isFetching:  false
};

const initialState = {
	postId:  0,
	threads: {
		t0: Object.assign({}, initialThreadState )
	}
};

function getThread( state, id ) {
	if ( id in state.threads ) {
		return state.threads[ id ];
	}

	return initialThreadState;
}

export default function comments( state = initialState, action ) {
	const { postId, threadId } = action;
	const threadState = getThread( state, threadId );

	let params;
	let currentPage;
	let items;

	switch ( action.type ) {
		case GET_COMMENTS_REQUEST:
			return Object.assign({}, state, {
				threads: Object.assign({}, state.threads, {
					[ threadId ]: threadState
				}),
				postId
			});

		case GET_COMMENTS_SUCCESS:
			params      = action.req.config.params;
			currentPage = parseInt( params.page, 10 ) || 1;

			if ( 1 < currentPage ) {
				items = threadState.items.concat( action.req.data );
			} else {
				items = action.req.data;
			}

			return Object.assign({}, state, {
				threads: Object.assign({}, state.threads, {
					[ threadId ]: Object.assign({}, threadState, {
						hasMore:    currentPage < action.req.headers[ 'x-wp-totalpages' ],
						isFetching: false,
						currentPage,
						items
					})
				})
			});

		case GET_COMMENTS_FAILURE:
			return Object.assign({}, state, {
				threads: Object.assign({}, state.threads, {
					[ threadId ]: Object.assign({}, threadState, {
						isFetching: false
					})
				})
			});

		default:
			return state;
	}
}
