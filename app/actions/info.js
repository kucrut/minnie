import { polyfill } from 'es6-promise';
import request from 'axios';
import { GET_INFO } from 'constants/index';


polyfill();

export default function fetchInfo() {
	return {
		type:    GET_INFO,
		promise: request({ url: '/bridge/v1/info' })
	};
}
