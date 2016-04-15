import { polyfill } from 'es6-promise'
import request from 'axios'
import { GET_SINGULAR } from 'constants/index'
import axios from 'axios'

polyfill()

function makeSingularRequest( slug, type='pages' ) {
	return request({
		method: 'get',
		url: `/wp/v2/${type}`,
		params: { slug: slug }
	})
}

export function fetchPage( params ) {
	return {
		type: GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'pages' )
	}
}

export function fetchPost( params ) {
	return {
		type: GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'posts' )
	}
}

export function fetchMedia( params ) {
	return {
		type: GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'media' )
	}
}
