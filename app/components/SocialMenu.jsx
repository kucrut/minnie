import React, { PropTypes } from 'react'
import he from 'he';

const SocialMenu = ({ items }) => {
	return (
		<div className="social-links">
			<ul id="menu-social" className="menu">
				{ items.map( item => {
					const id = `menu-item-${item.id}`

					return (
						<li key={ id } id={ id } className={ `menu-item ${id}` }>
							<a href={ item.url }><span className="screen-reader-text">{ he.decode( item.title ) }</span></a>
						</li>
					)
				}) }
			</ul>
		</div>
	)
}

SocialMenu.propTypes = {
	items: PropTypes.array.isRequired
}

export default SocialMenu
