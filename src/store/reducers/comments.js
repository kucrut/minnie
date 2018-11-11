import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE,
	POST_COMMENT_REQUEST,
	POST_COMMENT_SUCCESS,
	POST_COMMENT_FAILURE,
} from '../constants';

const initialThreadState = {
	currentPage: 0,
	hasMore: false,
	isFetching: false,
	items: [],
	parentId: 0,
};

const initialState = {
	error: null,
	isPosting: false,
	newComment: null,
	postId: 0,
	threads: [],
};

function updateThreads( threads, threadId, data, appendItems = true ) {
	const mergeData = thread => {
		const { items } = thread;
		const { items: newItems = [] } = data;

		return {
			...thread,
			...data,
			items: appendItems
				? [ ...items, ...newItems  ]
				: newItems,
			parentId: threadId,
		};
	};

	if ( ! threads.length ) {
		return [ mergeData( initialThreadState ) ];
	}

	const found = threads.find( thread => thread.parentId === threadId );
	const index = found ? threads.indexOf( found ) : -1;
	const thread = mergeData( found || initialThreadState );

	return index === -1
		? [ ...threads, thread ]
		: [
			...threads.slice( 0, index ),
			thread,
			...threads.slice( index + 1 ),
		];
}

export default function comments( state = initialState, action ) {
	switch ( action.type ) {
		case GET_COMMENTS_REQUEST: {
			const { parentId, postId } = action;
			const newState = postId === state.postId ? state : initialState;
			const { threads } = newState;

			return {
				...newState,
				postId,
				error: initialState.error,
				threads: updateThreads( threads, parentId, {
					isFetching: true,
				} ),
			};
		}

		case GET_COMMENTS_SUCCESS: {
			const { config, data, headers } = action.req;
			const { params } = config;
			const totalPages = headers[ 'x-wp-totalpages' ];
			const currentPage = Number( params.page ) || 1;
			const hasMore = currentPage < totalPages;
			const appendItems = currentPage > 1;
			const threads = updateThreads( state.threads, action.parentId, {
				currentPage,
				hasMore,
				isFetching: false,
				items: data,
			}, appendItems );

			return {
				...state,
				threads,
			};
		}

		case GET_COMMENTS_FAILURE: {
			// TODO: Add error.
			return {
				...state,
				threads: updateThreads( state.threads, action.parentId, {
					isFetching: false,
				} ),
			};
		}

		case POST_COMMENT_REQUEST: {
			return {
				...state,
			};
		}

		case POST_COMMENT_SUCCESS: {
			return {
				...state,
			};
		}

		case POST_COMMENT_FAILURE: {
			return {
				...state,
			};
		}

		default: {
			return state;
		}
	}
}
