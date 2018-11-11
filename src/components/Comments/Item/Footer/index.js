import React from 'react';

export default function Footer( props ) {
	const { comment } = props;
	const { author_name, author_avatar_urls, author_url } = comment;
	const avatarSrc = author_avatar_urls['48'];

	return (
		<footer className="comment-meta">
			<div className="comment-author vcard">
				<img
					alt=""
					src={ avatarSrc }
					className="avatar avatar-50 photo"
					width="50"
					height="50"
				/>
				<b className="fn">
					{ author_url ? (
						<a href={ author_url }>{ author_name }</a>
					) : author_name }
				</b>
				{ ' ' }
				<span className="says">says:</span>
			</div>
		</footer>
	)
}
