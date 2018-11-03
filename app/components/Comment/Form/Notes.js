/* eslint max-len: ["error", 140] */

import React from 'react';
import PropTypes from 'prop-types';

import Required from '../../Required';

export default function Notes( { userName } ) {
	if ( userName ) {
		return (
			<p className="logged-in-as">Logged in as <em>{ userName }</em>.</p>
		);
	}

	return (
		<p className="comment-notes">Your email address will not be published. Required fields are marked <Required /></p>
	);
}

Notes.propTypes = { userName: PropTypes.string };
