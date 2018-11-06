import React from 'react';

import EntryContent from './Content';

export default function ContentMedia( props ) {
	return (
		<div className="entry-content">
			<EntryContent className="description" content={ props.data.description.rendered } />
		</div>
	);
}
