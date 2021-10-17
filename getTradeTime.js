const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
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
const getTimestamp = (t) => {
    if (!t) return new Date().getTime();
    return new Date(t).getTime();
}
// 分钟转毫秒
const getMilliSecond = (t) => {
    if (typeof t != "number") return t;
    return t * 60 * 1000;
}
const deepClone = (obj) => {
    let cloneObj;
    // 判断当输入的数据是简单数据类型时，直接复制
    if (obj && typeof obj !== 'object') {
        cloneObj = obj;
    }
    // 当输入的数据是对象或者数组时
    else if (obj && typeof obj === 'object') {
        // 检测输入的数据是数组还是对象
        cloneObj = Array.isArray(obj) ? [] : {};

        // 变量数据对象
        for (let key in obj) {
            // 判断对象是否存在key属性
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    // 若当前元素类型为对象时，递归调用
                    cloneObj[key] = deepClone(obj[key]);
                }
                // 若当前元素类型为基本数据类型
                else {
                    cloneObj[key] = obj[key];
                }
            }
        }
    }
    return cloneObj;
}
const getTradeTime = (min, max, step) => {
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
        let children = deepClone(baseTimeList.filter(i => i.YTD == item.YTD)); // 年月日相同 
        let groupChildrenKey = [];
        children.map(u => u.H = new Date(u.timeStamp).getHours()+'时');
        children.map(u => {
            if (groupChildrenKey.find(i => i.H == u.H)) return;
            let subChildren = deepClone(children.filter(i => i.H == u.H)); // 年月日相同 
            subChildren.map(u => {
                u.M = new Date(u.timeStamp).getMinutes()+'分';
                delete u.H;
            })
            u.subChildren = subChildren;
            groupChildrenKey.push(u)
        })
        item.children = groupChildrenKey;
    })
    console.log(groupTimeKey)
    // debugger;

    return groupTimeKey;

}
getTradeTime(30, 140, 10);
