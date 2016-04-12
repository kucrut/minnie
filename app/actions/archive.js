import { polyfill } from 'es6-promise'
import request from 'axios'
import { GET_ARCHIVE } from 'constants/index'
import { normalizeParams } from 'helpers.js'
import axios from 'axios'

polyfill();

export function fetchArchive( params = {} ) {
	return {
		type: GET_ARCHIVE,
		promise: axios({
			method: 'get',
			url: `/wp/v2/posts`,
			params: normalizeParams( params )
		})
	}
}
