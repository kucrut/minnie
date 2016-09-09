import React, { Component, PropTypes } from 'react';
import Photoswipe from 'photoswipe';
import PhotoswipeUi from 'photoswipe/dist/photoswipe-ui-default';
import { closeGallery } from 'actions/galleries';

export default class PhotoSwipe extends Component {

	static propTypes = {
		gallery:      PropTypes.object.isRequired,
		startIndex:   PropTypes.number.isRequired,
		clickedThumb: PropTypes.object.isRequired,
		dispatch:     PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );

		this.state = {
			currentThumb: props.clickedThumb,
			items:        []
		};
	}

	componentWillMount() {
		this.setItems();
	}

	componentDidMount() {
		this.open();
	}

	getThumbBoundsFn( index ) {
		let currentThumb;

		if ( this.state.currentThumb ) {
			currentThumb = this.state.currentThumb;
		} else {
			const galleryEl = document.getElementById( this.props.gallery.id );
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

	setItems() {
		let items = [];

		this.props.gallery.items.forEach( item => {
			const { msrc, title, sizes } = item;
			const { src, w, h } = sizes[ sizes.length - 1 ];
			let psItem = { msrc, src, w, h };

			if ( title ) {
				psItem = Object.assign({}, psItem, { title });
			}

			items = items.concat( psItem );
		});

		this.setState({ items });
	}

	open() {
		const { gallery, startIndex } = this.props;
		let options = {
			index:            startIndex,
			captionEl:        gallery.showCaption,
			getThumbBoundsFn: this.getThumbBoundsFn.bind( this )
		};

		if ( gallery.single ) {
			options = Object.assign({}, options, {
				history: false,
				shareEl: false
			});
		} else {
			options = Object.assign({}, options, {
				galleryUID: gallery.id.replace( 'gallery-', '' )
			});
		}

		const instance = new Photoswipe( this.El, PhotoswipeUi, this.state.items, options );

		instance.listen( 'initialZoomInEnd', () => {
			// If this is a real gallery, unset currentThumb so that
			// getThumbBoundsFn works when Photoswipe is closed.
			if ( ! gallery.single ) {
				this.setState({ currentThumb: '' });
			}
		});

		instance.listen( 'destroy', () => {
			this.props.dispatch( closeGallery() );
		});

		instance.init();
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
