function $_storage() {
	const setSession = (key, value, type) => {
		try {
			if (type == 'json') {
				value = JSON.stringify(value);
			}
			sessionStorage.setItem(key, value);
		} catch (e) {}
	};
	const getSession = (key, type) => {
		let value = null;
		try {
			value = sessionStorage.getItem(key);
			if (type == 'json') {
				value = JSON.parse(value);
			}
		} catch (e) {
			value = -1;
		}

		return value;
	};
	const removeSession = key => {
		try {
			sessionStorage.removeItem(key);
		} catch (e) {}
	};
	const clearSession = () => {
		try {
			sessionStorage.clear();
		} catch (e) {}
	};
	const setLocal = (key, value, type) => {
		try {
			if (type == 'json') {
				value = JSON.stringify(value);
			}
			localStorage.setItem(key, value);
		} catch (e) {}
	};
	const getLocal = (key, type) => {
		let value = null;
		try {
			value = localStorage.getItem(key);
			if (type == 'json') {
				value = JSON.parse(value);
			}
		} catch (e) {
			value = -1;
		}
		return value;
	};
	const removeLocal = key => {
		try {
			localStorage.removeItem(key);
		} catch (e) {}
	};
	const clearLocal = () => {
		try {
			localStorage.clear();
		} catch (e) {}
	};
	return {
		setSession,
		getSession,
		removeSession,
		clearSession,
		setLocal,
		getLocal,
		removeLocal,
		clearLocal,
	};
}
export { $_storage };
