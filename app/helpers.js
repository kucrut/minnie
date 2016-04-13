import moment from 'moment'
import { forEach, has, isEmpty, size, unset } from 'lodash'
import { taxonomyMap } from 'constants/index'
import apiConfig from 'api/config.json'


export function normalizeParams( params ) {
	let filters = {}

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

export function stripApiHost( url ) {
	return url.replace( apiConfig.host, '' )
}

export function getTheDate( date ) {
	return moment( date  ).format( 'D MMMM YYYY' )
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
