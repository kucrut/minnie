import React, { Component, PropTypes } from 'react';

export default class PageHeader extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
	}

	renderDescription() {
		const { description } = this.props;
		let el;

		if ( description ) {
			el = (
				<div className="taxonomy-description" dangerouslySetInnerHTML={ { __html: description } } />
			);
		}

		return el;
	}

	render() {
		return (
			<header className="page-header">
				<h1 className="page-title">{ this.props.title }</h1>
				{ this.renderDescription() }
			</header>
		);
	}
}
