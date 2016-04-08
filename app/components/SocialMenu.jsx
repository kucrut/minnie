import React, { Component, PropTypes } from 'react'


class SocialMenu extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<div className="social-links">
				<ul id="menu-social" className="menu">
					{ this.props.items.map( item => (
						<li className="menu-item">
							<a href={ item.url }><span className="screen-reader-text">{ item.title }</span></a>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

SocialMenu.propTypes = {
	items: PropTypes.array.isRequired
}

export default SocialMenu
