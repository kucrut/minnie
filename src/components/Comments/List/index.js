import React from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';

export default function List( props ) {
	const { className, items, ...rest } = props;

	return (
		<ol className={ className }>
			{ items.map( comment => (
				<Item
					key={ comment.id }
					comment={ comment }
					{ ...rest }
				/>
			) ) }
		</ol>
		// TODO: Load more button
	);
}

List.defaultProps = {
	className: 'comment-list',
};

List.propTypes = {
	className: PropTypes.string,
};
