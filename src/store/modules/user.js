/**
 * @file 用户状态
 * @author Yangholmes 2021-04-01
 */

import store from '../index';
import {getUserInfo} from '@/api/user';
import {getToken, setToken} from '@/drivers/utils';

export default {
    namespaced: true,
    state: () => ({
        token: getToken(),
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            setToken(token);
        },
    },
    actions: {
        getUserInfo({commit}) {
            const {dispatch, rootState} = store;
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    const {token, access} = res.data;
                    commit('setToken', token);
                    dispatch('app/updateAccess', access)
                    resolve(res);
                });
            });

        }
    },
    getters: {}
};
