export const isNumeric = (val) => {
	return /^\d+(\.\d+)?$/.test(val);
}

export const isNaN = (val) => {
	if (Number.isNaN) {
		return Number.isNaN(val);
	}
	return val !== val;
}
