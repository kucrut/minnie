import React, { Component } from 'react';

import Comments from '../';
import Content from '../../Content';
import Footer from './Footer';
import ViewRepliesButton from './ViewRepliesButton';

export default class Item extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			showReplies: false,
		};
	}

	render() {
		const { showReplies } = this.state;
		const { comment, ...rest } = this.props;
		const {
			id,
			content,
			children_count,
			date,
			date_formatted,
			link,
		} = comment;

		return (
			<li className="comment" id={ `comment-${ id }` }>
				<article className="comment-body">
					<div className="comment-content">
						<Footer comment={ comment } />
						<Content content={ content.rendered } />
					</div>
					<div class="comment-metadata">
						<a href={ link }>
							<time dateTime={ date }>{ date_formatted }</time>
						</a>
						{ ( children_count > 0 && ! showReplies ) ? (
							<ViewRepliesButton
								onClick={ () => this.setState( { showReplies: true } ) }
							/>
						) : null }
					</div>
				</article>
				{ ( children_count > 0 && showReplies ) ? (
					<Comments { ...rest } threadId={ id } />
				) : null }
				{/* TODO: Show form if replytocom === id, replies allowed, still in allowed depth */}
			</li>
		);
	}
}
