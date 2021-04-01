/**
 * @file 用户状态
 * @author Yangholmes 2021-04-01
 */

import {getUserInfo} from '@/api/user';

export default {
    state: () => ({}),
    mutations: {},
    actions: {
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    resolve(res);
                });
            });

        }
    },
    getters: {}
};
