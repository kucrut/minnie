import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from 'actions/comments';
import CommentsList from 'containers/Comments/List';
import LoadMoreButton from 'components/LoadMoreButton';

class Comments extends Component {
	static propTypes = {
		isEnabled: PropTypes.bool.isRequired,
		comments:  PropTypes.object.isRequired,
		dispatch:  PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );

		this.fetchMore = this.fetchMore.bind( this );
	}

	fetchMore( params ) {
		const { dispatch, comments } = this.props;
		const { post, currentPage } = comments;
		const fetchParams = Object.assign({}, params, {
			parent: 0,
			page:   currentPage + 1,
			post
		});

		dispatch( fetchComments( fetchParams ) );
	}

	render() {
		const { isEnabled, comments } = this.props;
		const { hasMore, isFetching, items } = comments;

		if ( ! isEnabled && ! items.length ) {
			return null;
		}

		const buttonArgs = {
			text:    'Load More Comments',
			params:  { post: comments.post },
			onClick: this.fetchMore,
			hasMore,
			isFetching
		};

		return (
			<div className="comments-area" id="comments">
				<h2 className="comments-title">Comments</h2>

				<CommentsList items={ items } listClass="comment-list" />

				<LoadMoreButton { ...buttonArgs } />
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		comments: state.comments
	};
}

export default connect( mapStateToProps )( Comments );
