import request from 'axios';
import { GET_TAXONOMIES } from 'constants/index';

export default function fetchTaxonomies() {
	return {
		type: GET_TAXONOMIES,
		promise: request( { url: '/wp/v2/taxonomies' } ),
	};
}
