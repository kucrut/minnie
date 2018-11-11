renderComments() {
	const { info, user, singular, comments, query, dispatch } = this.props;
	const parentId = query.hasOwnProperty( 'replytocom' ) ? parseInt( query.replytocom, 10 ) : 0;
	const args = {
		isEnabled: singular.data.comment_status === 'open',
		postLink: singular.data.link,
		maxDepth: info.settings.comments.threads_depth,
		comments,
		parentId,
		dispatch,
		user,
	};

	return (
		<CommentsSection { ...args } />
	);
}

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
	parentId: 0,
	items: [],
	hasMore: false,
	currentPage: 0,
	isFetching: false,
};

const initialState = {
	newComment: {},
	isSubmitting: false,
	hasError: false,
	error: {},
	postId: 0,
	threads: {
		t0: Object.assign( {}, initialThreadState ),
	},
};

function getThread( state, parentId ) {
	const threadId = `t${parentId}`;

	if ( threadId in state.threads ) {
		return state.threads[ threadId ];
	}

	return Object.assign( {}, initialThreadState, {
		parentId,
	} );
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
	let error;

	switch ( action.type ) {
		case GET_COMMENTS_REQUEST:
			if ( postId === state.postId ) {
				threads = Object.assign( {}, state.threads, {
					[ threadId ]: Object.assign( {}, threadState, { isFetching: true } ),
				} );
			} else {
				threads = Object.assign( {}, {
					[ threadId ]: Object.assign( {}, threadState, { isFetching: true } ),
				} );
			}

			return Object.assign( {}, state, {
				postId,
				threads,
			} );

		case GET_COMMENTS_SUCCESS:
			params      = action.req.config.params;
			currentPage = parseInt( params.page, 10 ) || 1;

			if ( currentPage > 1 ) {
				items = threadState.items.concat( action.req.data );
			} else {
				items = action.req.data;
			}

			return Object.assign( {}, state, {
				threads: Object.assign( {}, state.threads, {
					[ threadId ]: Object.assign( {}, threadState, {
						hasMore: currentPage < action.req.headers[ 'x-wp-totalpages' ],
						isFetching: false,
						currentPage,
						items,
					} ),
				} ),
			} );

		case GET_COMMENTS_FAILURE:
			return Object.assign( {}, state, {
				threads: Object.assign( {}, state.threads, {
					[ threadId ]: Object.assign( {}, threadState, {
						isFetching: false,
					} ),
				} ),
			} );

		case POST_COMMENT_REQUEST:
			return Object.assign( {}, state, {
				isSubmitting: true,
				hasError: false,
				error: {},
			} );

		case POST_COMMENT_SUCCESS:
			newComment = Object.assign( {}, action.req.data );

			if ( newComment.status !== 'approved' ) {
				newComment = Object.assign( {}, newComment, {
					content: Object.assign( {}, newComment.content, {
						original: newComment.content.rendered,
						rendered: `<p class="comment-awaiting-moderation">${onHoldText}</p>`,
					} ),
				} );
			}

			items = threadState.items.concat( [ newComment ] );

			return Object.assign( {}, state, {
				newComment,
				isSubmitting: false,
				threads: Object.assign( {}, state.threads, {
					[ threadId ]: Object.assign( {}, threadState, { items } ),
				} ),
			} );

		case POST_COMMENT_FAILURE:
			if ( action.error.status === 409 ) {
				error = { duplicate: dupeText };
			} else {
				error = action.error.data.data.params;
			}

			return Object.assign( {}, state, {
				isSubmitting: false,
				hasError: true,
				error,
			} );

		default:
			return state;
	}
}
