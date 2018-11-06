import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PrimaryMenu from '../PrimaryMenu';
import SearchForm from '../../SearchForm';

export default function Sidebar( props ) {
	const { isExpanded, menu, ...rest } = props;

	const sbClass = classNames( {
		'slide-menu': true,
		expanded: isExpanded,
	} );

	return (
		<div className={ sbClass }>
			{ ( menu && menu.items.length ) ? (
				<Fragment>
					<h2 className="widget-title">Menu</h2>
					<PrimaryMenu items={ menu.items } { ...rest } />
				</Fragment>
			) : null }
			<SearchForm />
		</div>
	);
}

Sidebar.defaultProps = {
	menu: null,
};

Sidebar.propTypes = {
	isExpanded: PropTypes.bool.isRequired,
	menu: PropTypes.object,
};
