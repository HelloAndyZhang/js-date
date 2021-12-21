//常用方法
export const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
	const config = {
		YYYY: date.getFullYear(),
		MM: date.getMonth() + 1,
		DD: date.getDate(),
		HH: date.getHours(),
		mm: date.getMinutes(),
		ss: date.getSeconds(),
	}
	for (const key in config) {
		format = format.replace(key, config[key])
	}
	return format
}
export const getTimestamp = (t) => {
	if (!t) return new Date().getTime();
	return new Date(t).getTime();
}
// 分钟转毫秒
export const getMilliSecond = (t) => {
	if (typeof t != "number") return t;
	return t * 60 * 1000;
}
export const deepClone = (obj) => {
	let cloneObj;
	if (obj && typeof obj !== 'object') {
		cloneObj = obj;
	}
	else if (obj && typeof obj === 'object') {
		cloneObj = Array.isArray(obj) ? [] : {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === 'object') {
					cloneObj[key] = deepClone(obj[key]);
				}
				else {
					cloneObj[key] = obj[key];
				}
			}
		}
	}
	return cloneObj;
}


export default dateFormat
