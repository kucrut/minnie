import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE,
	POST_COMMENT_REQUEST,
	POST_COMMENT_SUCCESS,
	POST_COMMENT_FAILURE,
} from '../constants';

const onHoldText = 'Your comment is waiting for moderation.';
const dupeText = 'Duplicate comment detected; it looks as though you’ve already said that!';

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

export default function comments( state = initialState, action ) {
	switch ( action.type ) {
		case GET_COMMENTS_REQUEST: {
			return {
				...state,
			};
		}

		case GET_COMMENTS_SUCCESS: {
			return {
				...state,
			};
		}

		case GET_COMMENTS_FAILURE: {
			return {
				...state,
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
