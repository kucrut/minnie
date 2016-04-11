import moment from 'moment'
import apiConfig from 'api/config.json'


export function normalizeParams( params ) {
	return Object.assign( {}, params, {
		page: parseInt( ( params.page || 1 ), 10 )
	})
}

export function stripApiHost( url ) {
	return url.replace( apiConfig.host, '' )
}

export function getTheDate( date ) {
	return moment( date  ).format( 'D MMMM YYYY' )
}
