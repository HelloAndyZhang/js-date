
export const isAndroid = () => {
	return /android/.test(navigator.userAgent.toLowerCase());
}

export const isIOS = () => {
	return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

export const isWeixin = () => {
	return /micromessenger/.test(navigator.userAgent.toLowerCase());
}
