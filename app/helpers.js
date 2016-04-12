import moment from 'moment'
import { forEach, has, isEmpty, unset } from 'lodash'
import apiConfig from 'api/config.json'

const taxonomyMaps = {
	format: 'post_format'
}


export function normalizeParams( params ) {
	let filters = {}

	params = Object.assign( {}, params, {
		page: parseInt( ( params.page || 1 ), 10 )
	})

	forEach( taxonomyMaps, ( taxonomy, restBase ) => {
		if ( has( params, restBase ) ) {
			let term = 'format' === restBase ? `post-format-${params[restBase]}` : params[restBase]

			filters = Object.assign( {}, filters, {
				[taxonomy]: term
			})

			unset( params, restBase )
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
