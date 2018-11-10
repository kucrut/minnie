import React, { Component } from 'react';

import Comments from '../';
import Content from '../../Content';

const Button = ( { children, ...rest } ) => (
	<button className="comment-view-replies-link genericon genericon-downarrow" { ...rest }>{ children }</button>
);

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
		const { id, content, children_count } = comment;

		return (
			<li className="comment" id={ `comment-${ id }` }>
				<Content
					className="comment-content"
					content={ content.rendered }
				/>
				{ ( children_count > 0 && ! showReplies ) ? (
					<Button onClick={ () => this.setState( { showReplies: true } ) }>Show Replies</Button>
				) : null }
				{ ( children_count > 0 && showReplies ) ? (
					<Comments { ...rest } threadId={ id } />
				) : null }
			</li>
		);
	}
}
