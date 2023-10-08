export const writeLocalStorage = (key: string, value: object | string) => {
	let data = JSON.stringify(value);
	window.localStorage.setItem(key, data);
}

export const readLocalStorage = (key: string) => {
	let data = window.localStorage.getItem(key);
	if (data) {
		data = JSON.parse(data)
	}

	return data;
}