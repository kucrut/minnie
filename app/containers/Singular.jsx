import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSingular } from 'actions/singular'

class Singular extends Component {
	constructor( props ) {
		super( props )
	}

	static need = [
		fetchSingular
	]

	_fetchSingular( slug ) {
		this.props.dispatch( fetchSingular({ slug: slug }) )
	}

	getContent() {
		return { __html: this.props.data.content.rendered }
	}

	componentWillMount() {
		const { slug, isFetching } = this.props

		if ( ! isFetching ) {
			this._fetchSingular( slug )
		}
	}

	componentWillReceiveProps( nextProps ) {
		const { slug, isFetching } = nextProps

		if ( ! isFetching && slug !== this.props.slug ) {
			this._fetchSingular( slug )
		}
	}

	render() {
		const { data } = this.props

		if ( ! data.id ) {
			return (
				<p>Loading&hellip;</p>
			)
		}

		return (
			<div className="content">
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<article id={ `post-${ data.id }` } className="hentry">
							<header className="entry-header">
								<h1 className="entry-title">{ data.title.rendered }</h1>
							</header>
							<div className="entry-content" dangerouslySetInnerHTML={ this.getContent() } />
						</article>
					</main>
				</div>
			</div>
		)
	}
}

Singular.propTypes = {
	slug: PropTypes.string.isRequired,
	data: PropTypes.object,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params

	return {
		slug: slug,
		...state.singular
	}
}

export default connect( mapStateToProps )( Singular )
