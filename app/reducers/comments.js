import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE,
	POST_COMMENT_SUCCESS
} from 'constants/index';

const onHoldText = 'Your comment is waiting for moderation.';

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

	let threads;
	let params;
	let currentPage;
	let items;
	let newComment;

	switch ( action.type ) {
		case GET_COMMENTS_REQUEST:
			if ( postId === state.postId ) {
				threads = Object.assign({}, state.threads, {
					[ threadId ]: Object.assign({}, threadState, { isFetching: true })
				});
			} else {
				threads = Object.assign({}, {
					[ threadId ]: Object.assign({}, threadState, { isFetching: true })
				});
			}

			return Object.assign({}, state, { postId, threads });

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

		case POST_COMMENT_SUCCESS:
			newComment = Object.assign({}, action.req.data );

			if ( 'approved' !== newComment.status ) {
				newComment = Object.assign({}, newComment, {
					content: Object.assign({}, newComment.content, {
						original: newComment.content.rendered,
						rendered: `<p class="comment-awaiting-moderation">${onHoldText}</p>`
					})
				});
			}

			items = threadState.items.concat( [newComment] );

			return Object.assign({}, state, {
				threads: Object.assign({}, state.threads, {
					[ threadId ]: Object.assign({}, threadState, { items })
				})
			});

		default:
			return state;
	}
}
