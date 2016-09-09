import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import Photoswipe from 'photoswipe';
import PhotoswipeUi from 'photoswipe/dist/photoswipe-ui-default';
import { closeGallery } from 'actions/galleries';

class PhotoSwipe extends Component {

	static propTypes = {
		galleries: PropTypes.object.isRequired,
		dispatch:  PropTypes.func.isRequired
	}

	componentDidMount() {
		if ( '' !== this.props.galleries.activeId ) {
			this.open( this.props );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( '' === nextProps.galleries.activeId ) {
			this.close();
		} else {
			this.open( nextProps );
		}
	}

	getThumbBoundsFn( index ) {
		let currentThumb;

		if ( this.currentThumb ) {
			currentThumb = this.currentThumb;
		} else {
			const galleryEl = document.getElementById( this.props.galleries.activeId );
			const allThumbs = galleryEl.querySelectorAll( '.gallery-item' );
			currentThumb = allThumbs[ index ];
		}

		const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
		const rect = currentThumb.querySelector( 'img' ).getBoundingClientRect();

		return {
			x: rect.left,
			y: ( rect.top + pageYScroll ),
			w: rect.width
		};
	}

	open( props ) {
		const { groups, activeId, startIndex, clickedThumb } = props.galleries;
		const gallery =  find( groups, { id: activeId });
		let items = [];

		if ( ! gallery ) {
			return;
		}

		this.currentThumb = clickedThumb;

		gallery.items.forEach( item => {
			items = items.concat( item.slice( -1 ) );
		});

		this.instance = new Photoswipe( this.El, PhotoswipeUi, items, {
			index:            startIndex,
			captionEl:        gallery.showCaption,
			galleryUID:       activeId.replace( 'gallery-', '' ),
			getThumbBoundsFn: this.getThumbBoundsFn.bind( this )
		});

		this.instance.listen( 'initialZoomInEnd', () => {
			this.currentThumb = null;
		});

		this.instance.listen( 'destroy', () => {
			this.props.dispatch( closeGallery() );
		});

		this.instance.init();
	}

	close() {
		if ( this.instance ) {
			this.instance.close();
		}
	}

	render() {
		return (
			<div
				className="pswp"
				tabIndex="-1"
				role="dialog"
				aria-hidden="true"
				ref={ c => { this.El = c; } }
			>
				<div className="pswp__bg" />
				<div className="pswp__scroll-wrap">
					<div className="pswp__container">
						<div className="pswp__item" />
						<div className="pswp__item" />
						<div className="pswp__item" />
					</div>
					<div className="pswp__ui pswp__ui--hidden">
						<div className="pswp__top-bar">
							<div className="pswp__counter" />
							<button className="pswp__button pswp__button--close" title="Close (Esc)" />
							<button className="pswp__button pswp__button--share" title="Share" />
							<button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />
							<button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
							<div className="pswp__preloader">
								<div className="pswp__preloader__icn">
									<div className="pswp__preloader__cut">
										<div className="pswp__preloader__donut" />
									</div>
								</div>
							</div>
						</div>

						<div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
							<div className="pswp__share-tooltip" />
						</div>

						<button
							className="pswp__button pswp__button--arrow--left"
							title="Previous (arrow left)"
						/>
						<button
							className="pswp__button pswp__button--arrow--right"
							title="Next (arrow right)"
						/>

						<div className="pswp__caption">
							<div className="pswp__caption__center" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		galleries: state.galleries,
	};
}

export default connect( mapStateToProps )( PhotoSwipe );
