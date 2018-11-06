import { parse } from 'qs';

import { fetchPost } from '../store/actions/singular';
import withSingularData from '../higher-order/with-singular-data';
import Singular from '../containers/Singular';
// import CommentsSection from '../containers/Comments/Section';

function fetchData( props ) {
	const { dispatch, slug } = props;
	const args = {
		params: { slug },
	};

	dispatch( fetchPost( args ) );
}

function mapStateToProps( state, ownProps ) {
	const query = parse( ownProps.location.search, { ignoreQueryPrefix: true } );

	return {
		query,
		comments: state.comments,
	};
}

/*
class Post extends Component {
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
}
*/

const Post = withSingularData( {
	fetchData,
	mapStateToProps,
	need: [ fetchPost ],
} )( Singular );

export default Post;
