/**
 * @file axios 实例
 * @author Yangholmes 2021-04-01
 */

import HttpRequest from '@/drivers/http/axios';
import {baseUrl} from '@/config';

const base = process.env.NODE_ENV && baseUrl.user[process.env.NODE_ENV] || '/';

export default new HttpRequest(base);
