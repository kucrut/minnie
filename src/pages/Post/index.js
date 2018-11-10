import React from 'react';
import { parse } from 'qs';
import { hot } from 'react-hot-loader'

import { fetchPost } from '../../store/actions/singular';
import withSingularData from '../../higher-order/with-singular-data';
import Comments from '../../components/Comments';
import Singular from '../../containers/Singular';
import Entry from '../../components/Entry';

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPost( args ) );
}

const mapStateToProps = ( state, ownProps ) => ( {
	comments: state.comments,
	query: parse( ownProps.location.search, {
		ignoreQueryPrefix: true,
	} ),
} );

function Post( props ) {
	const { comments, dispatch, singular } = props;
	const { data } = singular;
	const { comment_status, id } = data;
	const { postId, threads } = comments;

	// TODO: Check `replytocom` in query.
	const isCommentOpen = comment_status === 'open';
	const commentsThread = ( postId === id && isCommentOpen )
		? threads.find( thread => thread.parentId === 0 )
		: null;

	return (
		<Singular { ...props }>
			<Entry isSingle data={ data } />
			{ ( isCommentOpen || ( commentsThread && commentsThread.items.length ) ) ? (
				<Comments
					dispatch={ dispatch }
					isOpen={ isCommentOpen }
					postId={ id }
					thread={ commentsThread }
				/>
			) : null }
		</Singular>
	)
}

const postWithSingularData = withSingularData( {
	fetchData,
	mapStateToProps,
	need: [ fetchPost ],
} )( Post )

export default hot( module )( postWithSingularData );
