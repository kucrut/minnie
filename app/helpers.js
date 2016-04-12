import moment from 'moment'
import { forEach, has, isEmpty, unset } from 'lodash'
import apiConfig from 'api/config.json'

const taxonomyMap = {
	tag: 'tag',
	format: 'post_format',
	category: 'category_name'
}


export function normalizeParams( params ) {
	let filters = {}

	params = Object.assign( {}, params, {
		page: parseInt( ( params.page || 1 ), 10 )
	})

	forEach( taxonomyMap, ( wpQueryArg, routeParam ) => {
		if ( has( params, routeParam ) ) {
			let term = 'format' === routeParam ? `post-format-${params[routeParam]}` : params[routeParam]

			filters = Object.assign( {}, filters, {
				[wpQueryArg]: term
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
