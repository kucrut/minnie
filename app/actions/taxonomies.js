import { polyfill } from 'es6-promise';
import request from 'axios';
import { GET_TAXONOMIES } from 'constants/index';


polyfill();

export function fetchTaxonomies() {
	return {
		type:    GET_TAXONOMIES,
		promise: request({ url: '/wp/v2/taxonomies' })
	};
}
