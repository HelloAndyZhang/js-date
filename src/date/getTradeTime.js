import { dateFormat, getTimestamp, getMilliSecond, deepClone } from '../utils/index.js';

/**
 * @description:计算营业时间
 * @param  {string} min 可选最小时间 ,如：30...
 * @param  {string} max  可选最大时间 , 1440 ...
 * @param  {string} step  可选时间间隔 如：10/20/30
 * @return {array}
 */

export const getTradeTime = (min, max, step) => {
	let beginTime = new Date(getTimestamp() + getMilliSecond(min));
	beginTime.setMinutes(Math.ceil(beginTime.getMinutes() / 10) * 10);
	beginTime.setSeconds(0);
	let beginTimestamp = getTimestamp(beginTime);
	let endTime = new Date(beginTimestamp + getMilliSecond(max));
	let endTimestamp = getTimestamp(endTime);
	let baseTimeList = [];
	let stepMilliSecond = getMilliSecond(step);
	for (let i = beginTimestamp; i < endTimestamp; i += stepMilliSecond) {
		baseTimeList.push({
			timeStamp: i,
			date: dateFormat(new Date(i)),
			YTD: dateFormat(new Date(i,), 'YYYY-MM-DD'),
		})
	}
	// 中间容器 以年月日为单位 分类
	let groupTimeKey = [];
	baseTimeList.map(item => !groupTimeKey.find(i => i.YTD == item.YTD) && groupTimeKey.push(item));

	groupTimeKey.map(item => {
		let children = deepClone(baseTimeList.filter(i => i.YTD == item.YTD)); // 年月日相同日期
		let groupChildrenKey = [];
		children.map(u => u.H = new Date(u.timeStamp).getHours());
		children.map(u => {
			if (groupChildrenKey.find(i => i.H == u.H)) return;
			let subChildren = deepClone(children.filter(i => i.H == u.H)); // 小时相同日期
			subChildren.map(u => {
				u.M = new Date(u.timeStamp).getMinutes();
				delete u.H; //分钟列不需要展示小时
			})
			u.subChildren = subChildren;
			groupChildrenKey.push(u)
		})
		item.children = groupChildrenKey;
	})
	return groupTimeKey;
}



