import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { find } from 'lodash';

class EntryFormat extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		formats: PropTypes.array.isRequired,
	}

	getFormat() {
		const { data, formats } = this.props;
		let format = find( formats, { slug: `post-format-${data.format}` } );

		// Post format: Standard
		if ( ! format ) {
			format = {
				name: 'Standard',
				link: data.link,
			};
		}

		return format;
	}

	render() {
		const format = this.getFormat();

		return (
			<div className="entry-format">
				<Link to={ format.link } title={ `All ${format.name} posts` }>
					<span className="screen-reader-text">{ format.name }</span>
				</Link>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return { formats: state.terms.items.formats };
}

export default connect( mapStateToProps )( EntryFormat );
