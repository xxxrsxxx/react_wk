import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from '../types';
import { USER_SERVER } from 'api/config';
import { getApi, postApi } from 'api/index';

export function registerUser(dataToSubmit) {
	const request = postApi(`${USER_SERVER}/register`, dataToSubmit).then(res => res.data);
	return {
		type: REGISTER_USER,
		payload: request,
	};
}

export function loginUser(dataToSubmit) {
	const request = postApi(`${USER_SERVER}/login`, dataToSubmit).then(res => res.data);
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function auth() {
	const request = getApi(`${USER_SERVER}/auth`).then(res => res.data);
	return {
		type: AUTH_USER,
		payload: request,
	};
}

export function logoutUser() {
	const request = getApi(`${USER_SERVER}/logout`).then(res => res.data);
	return {
		type: LOGOUT_USER,
		payload: request,
	};
}
