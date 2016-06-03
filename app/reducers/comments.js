import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE
} from 'constants/index';

const initialThreadState = {
	parentId:    0,
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

function getThread( state, parentId ) {
	const threadId = `t${parentId}`;

	if ( threadId in state.threads ) {
		return state.threads[ threadId ];
	}

	return Object.assign({}, initialThreadState, {
		parentId
	});
}

export default function comments( state = initialState, action ) {
	const { postId, parentId } = action;
	const threadId = `t${parentId}`;
	const threadState = getThread( state, parentId );

	let params;
	let currentPage;
	let items;

	switch ( action.type ) {
		case GET_COMMENTS_REQUEST:
			return Object.assign({}, state, {
				postId,
				threads: Object.assign({}, state.threads, {
					[ threadId ]: Object.assign({}, threadState, {
						isFetching: true
					})
				})
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
