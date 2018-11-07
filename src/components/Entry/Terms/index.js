import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { decode } from 'he';

export default function EntryTerms( { terms } ) {
	return (
		<span className="tags-links">
			{ terms.map( term => (
				<span key={ term.id }>
					<Link to={ term.link } rel="tag">{ decode( term.name ) }</Link>
				</span>
			) ) }
		</span>
	);
}

EntryTerms.propTypes = {
	terms: PropTypes.shape( {
		link: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	} ).isRequired,
};
