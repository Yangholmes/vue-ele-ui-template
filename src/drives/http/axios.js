/**
 * @file axios 驱动
 * @author Yangholmes 2021-03-31
 */

import axios from 'axios';
import {filter, addErrorLog} from '../interceptors';

class HttpRequest {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            timeout: 5e3,
            headers: {}
        };
        return config;
    }
    destroy(url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            // TODO 销毁等待
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            if (!Object.keys(this.queue).length && config.globalPending) {
                // TODO 请求等待
            }
            this.queue[url] = true;
            return config;
        }, error => Promise.reject(error));
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url);
            // 数据过滤
            const data = filter(res);
            if (data.code) {
                // TODO 失败处理
                return Promise.reject(data);
            }
            return data;
        }, error => {
            this.destroy(url);
            let errorInfo = error.response;
            if (!errorInfo) {
                const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error));
                errorInfo = {
                    statusText,
                    status,
                    request: {
                        responseURL: config.url
                    }
                };
            }
            // 错误记录
            addErrorLog(errorInfo);
            return Promise.reject(error);
        });
    }
    mergeOptions(options) {
        const config = this.getInsideConfig();
        Object.keys(options).forEach(p => {
            if (options[p].constructor === Object) {
                config[p] = Object.assign({}, config[p], options[p]);
            }
            else {
                config[p] = options[p];
            }
        });
        return config;
    }
    request(options) {
        const instance = axios.create();
        options = this.mergeOptions(options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}
export default HttpRequest;
