import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { find } from 'lodash'
import { stripApiHost } from 'helpers.js'


class EntryFormat extends Component {
	getFormat() {
		const { data, formats } = this.props
		let format = find( formats, {
			slug: `post-format-${ data.format }`
		})

		// Post format: Standard
		if ( ! format ) {
			format = {
				name: 'Standard',
				link: data.link
			}
		}

		return format
	}

	render() {
		const format = this.getFormat()

		return (
			<div className="entry-format">
				<Link to={ stripApiHost( format.link ) } title={ `All ${format.name} posts` }>
					<span className="screen-reader-text">{ format.name }</span>
				</Link>
			</div>
		)
	}
}

EntryFormat.propTypes = {
	data: PropTypes.object.isRequired,
	formats: PropTypes.array.isRequired
}

function mapStateToProps( state ) {
	return {
		formats: state.terms.items.formats
	}
}

export default connect( mapStateToProps )( EntryFormat )
