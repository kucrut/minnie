import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function EntryFormat( props ) {
	const { data, formats } = props;
	const { format } = data;
	let term = formats.find( item => item.slug === `post-format-${ format }` );

	// Fallback to standard.
	if ( ! term ) {
		term = {
			name: 'Standard',
			link: data.link,
		};
	}

	const { link, name } = term;

	return (
		<div className="entry-format">
			<Link to={ link } title={ `All ${ name } posts` }>
				<span className="screen-reader-text">{ name }</span>
			</Link>
		</div>
	);
}

EntryFormat.propTypes = {
	data: PropTypes.object.isRequired,
	formats: PropTypes.array.isRequired,
}

const mapStateToProps = state => ( {
	formats: state.terms.items.formats,
} );

export default connect( mapStateToProps )( EntryFormat );
