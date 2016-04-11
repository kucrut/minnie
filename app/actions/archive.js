import { polyfill } from 'es6-promise'
import request from 'axios'
import { GET_ARCHIVE } from 'constants/index'
import axios from 'axios'

polyfill();

export function fetchArchive( params = {} ) {
	return {
		type: GET_ARCHIVE,
		promise: request({
			method: 'get',
			url: `/wp/v2/posts`,
			params: params
		})
	}
}
