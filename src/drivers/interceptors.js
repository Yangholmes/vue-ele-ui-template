/**
 * @file 请求拦截器
 * @author Yangholmes 2021-03-31
 */

/**
 * 响应数据过滤
 * @param Object raw 原始数据
 * @return 过滤数据
 */
export const filter = raw => {
    let {headers, status, data} = raw;
    return data;
};

/**
 * 网络通信错误记录
 * @param Object errorInfo 错误数据
 */
export const addErrorLog = errorInfo => {};