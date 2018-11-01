import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';

export default function SocialMenu( { items } ) {
	return (
		<div className="social-links">
			<ul id="menu-social" className="menu">
				{ items.map( item => {
					const id = `menu-item-${item.id}`;

					return (
						<li key={ id } id={ id } className={ `menu-item ${id}` }>
							<a href={ item.url }>
								<span className="screen-reader-text">{ he.decode( item.title ) }</span>
							</a>
						</li>
					);
				} ) }
			</ul>
		</div>
	);
}

SocialMenu.propTypes = { items: PropTypes.array.isRequired };
