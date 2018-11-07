import React from 'react';
import { hot } from 'react-hot-loader'
import Main from '../../containers/Main';
import EntryEmpty from '../../components/Entry/Empty';

function NotFound() {
	return (
		<Main title="Oops!">
			<EntryEmpty
				title="Oops! That page can&rsquo;t be found."
				content="It looks like nothing was found at this location. Maybe try a search?"
			/>
		</Main>
	);
}

export default hot( module )( NotFound );
