/**
 * @file axios 实例
 * @author Yangholmes 2021-04-01
 */

import HttpRequest from '@/drivers/http/axios';
import config from '@/config';

const baseUrl = process.env.NODE_ENV && config.baseUrl.user[process.env.NODE_ENV] || '/';

export default new HttpRequest(baseUrl);
