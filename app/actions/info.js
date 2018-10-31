import request from 'axios';
import { GET_INFO } from 'constants/index';

export default function fetchInfo() {
	return {
		type: GET_INFO,
		promise: request( { url: '/bridge/v1/info' } ),
	};
}
