import { polyfill } from 'es6-promise';
import request from 'axios'
import * as types from 'constants/index'


polyfill();

export function fetchInfo() {
	return {
		type: types.GET_INFO,
		promise: request({ url: '/' })
	}
}
