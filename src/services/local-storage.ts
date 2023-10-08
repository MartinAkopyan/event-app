export const writeLocalStorage = (key: string, value: object | string) => {
	let data = JSON.stringify(value);
	window.localStorage.setItem(key, data);
}

export const readLocalStorage = (key: string, parseData: boolean = false) => {
	let data = window.localStorage.getItem(key);
	if (data && parseData) {
		data = JSON.parse(data)
	}

	return data;
}