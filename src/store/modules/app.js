/**
 * @file app 状态
 * @author Yangholmes 2021-04-01
 */

export default {
    namespaced: true,
    state: () => ({
        access: []
    }),
    mutations: {
        updateAccess(state, access) {
            state.access = access.slice();
        }
    },
    actions: {
        updateAccess({commit}, access) {
            commit('updateAccess', access);
            // console.log(access);
        }
    }
};