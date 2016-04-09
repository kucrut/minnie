import moment from 'moment'
import apiConfig from 'api/config.json'


export function stripApiHost( url ) {
	return url.replace( apiConfig.host, '' )
}

export function getTheDate( date ) {
	return moment( date  ).format( 'D MMMM YYYY' )
}
