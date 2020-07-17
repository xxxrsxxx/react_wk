import axios from 'axios';

function createInstance() {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});
	return instance;
}

const instance = createInstance();

async function postApi(url, data, config) {
	try {
		const res = await instance.post(url, data, config);
		return res;
	} catch (e) {
		console.log('postApi error', e);
	}
}
async function getApi(url, data, config) {
	try {
		const res = await instance.get(url, data, config);
		return res;
	} catch (e) {
		console.log('postApi error', e);
	}
}

export { postApi, getApi };
