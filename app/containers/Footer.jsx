import React, { Component, PropTypes } from 'react'


class Footer extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<footer id="colophon" className="site-footer" role="contentinfo">
				<div className="site-info">
					<a href="http://wordpress.org/">Proudly powered by WordPress</a>
					<span className="sep"> | </span>
					Based on Minnow Theme by <a href="https://wordpress.com/themes/" rel="designer">WordPress.com</a>.
				</div>
			</footer>
		)
	}
}

export default Footer
