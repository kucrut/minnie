import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import he from 'he';

export default class EntryTitle extends Component {
	static propTypes = {
		link: PropTypes.string,
		title: PropTypes.string.isRequired,
		isSingle: PropTypes.bool.isRequired,
	}

	render() {
		const { isSingle, link, title } = this.props;
		const titleText = he.decode( title );
		let el;

		if ( isSingle ) {
			el = (
				<h1 className="entry-title">{ titleText }</h1>
			);
		} else {
			el = (
				<h1 className="entry-title">
					<Link to={ link }>{ titleText }</Link>
				</h1>
			);
		}

		return el;
	}
}
