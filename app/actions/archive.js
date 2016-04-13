import axios from 'axios'
import { polyfill } from 'es6-promise'
import { GET_ARCHIVE } from 'constants/index'
import { normalizeParams } from 'helpers.js'


polyfill();

function makeArchiveRequest( params ) {
	return axios({
		method: 'get',
		url: '/wp/v2/posts',
		params: normalizeParams( params )
	})
}

export function fetchArchive( params = {} ) {
	return {
		type: GET_ARCHIVE,
		promise: makeArchiveRequest( params )
	}
}
