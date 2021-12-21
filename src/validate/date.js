import { isNaN } from './number';

export const isDate = (val) => {
	return (
		Object.prototype.toString.call(val) === '[object Date]' &&
		!isNaN(val.getTime())
	);
}

export const isToday = (date) => {
	if (!isDate(date)) return !1;
	let today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	let offset = date.getTime() - today.getTime()
	return offset >= 0 && offset < 1000 * 60 * 60 * 24
}