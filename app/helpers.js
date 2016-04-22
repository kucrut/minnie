import qs from 'qs'
import axios from 'axios'
import { forEach, has, isEmpty, omit, size, unset, trim } from 'lodash'
import { taxonomyMap } from 'constants/index'


export function configureAxios( apiUrl ) {
	axios.defaults.baseURL = `${ trim( apiUrl, '/' ) }/wp-json/`
	axios.defaults.headers = {'X-Requested-With': 'minnie'}
	axios.defaults.paramsSerializer = params => qs.stringify( params, {
		arrayFormat: 'brackets'
	})
}

export function normalizeParams( params ) {
	let filters = {}

	if ( has( params, 's' ) ) {
		params = Object.assign( {}, omit( params, 's' ), {
			search: params.s
		})
	}

	params = Object.assign( {}, params, {
		page: parseInt( ( params.page || 1 ), 10 )
	})

	forEach( taxonomyMap, ( props, routeParam ) => {
		if ( has( params, routeParam ) ) {
			let term = 'format' === routeParam ? `post-format-${params[routeParam]}` : params[ routeParam ]

			filters = Object.assign( {}, filters, {
				[ props.queryVar ]: term
			})

			unset( params, routeParam )
		}
	})

	if ( ! isEmpty( filters ) ) {
		params = Object.assign( {}, params, {
			filter: filters
		})
	}

	return params
}

export function getArchiveTaxonomyTerm( params ) {
	let result = null

	if ( 1 > size( params ) ) {
		return result
	}

	forEach( taxonomyMap, ( props, routeParam ) => {
		if ( has( params, routeParam ) ) {
			let slug = params[ routeParam ]

			if ( 'format' === routeParam ) {
				slug = `post-format-${ slug }`
			}

			result = {
				endpoint: props.endpoint,
				slug: slug
			}

			return false
		}
	})

	return result
}

export function getAdjacentLink( next = true, args ) {
	const { hasMore, currentPage, route, routeParams, query } = args

	function addSearchQuery( link ) {
		if ( has( query, 's' ) ) {
			link += `?s=${query.s}`
		}

		return link
	}

	let link      = ''
	let paths     = []
	let newPage   = next ? currentPage - 1 : currentPage + 1
	let newParams = { page: newPage }

	// Home's prev
	if ( hasMore && ! route.path && ! next ) {
		return addSearchQuery( '/page/2' )
	} else if ( 0 === newPage || ( ! hasMore && ! next ) ) {
		return link
	}

	paths = [ route.path ]

	if ( route.childRoutes ) {
		forEach( route.childRoutes, el => {
			if ( el.path ) {
				paths.push( el.path )
			}
		})
	}

	link = paths.join( '/' )

	newParams = Object.assign( {}, routeParams, newParams )
	forEach( newParams, ( value, key ) => {
		link = link.replace( `:${key}`, value )
	})

	link = link.replace( 'page/1', '' )
	link = trim( link, '/' )
	link = '/' + link

	return addSearchQuery( link )
}
