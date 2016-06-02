import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class LoadMoreButton extends Component {
	static defaultProps = {
		text:   'Load More',
		params: {}
	}

	static propTypes = {
		onClick:    PropTypes.func.isRequired,
		hasMore:    PropTypes.bool.isRequired,
		isFetching: PropTypes.bool.isRequired,
		text:       PropTypes.string,
		params:     PropTypes.object
	}

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick() {
		const { onClick, params, isFetching } = this.props;

		if ( ! isFetching ) {
			onClick( params );
		}
	}

	render() {
		const { text, hasMore, isFetching } = this.props;

		if ( ! hasMore ) {
			return null;
		}

		const iconClass = classNames({
			genericon:            true,
			'animate-spin':       isFetching,
			'genericon-refresh':  isFetching,
			'genericon-download': ! isFetching
		});

		return (
			<div className="load-more">
				<a onClick={ this.handleClick }>
					<i className={ iconClass } aria-hidden="true" />{ text }
				</a>
			</div>
		);
	}
}
