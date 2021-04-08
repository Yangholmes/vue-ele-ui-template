/**
 * @file app 状态
 * @author Yangholmes 2021-04-01
 */

export default {
    namespaced: true,
    state: () => ({
        accessUpdated: false,
        access: [],
        router: []
    }),
    mutations: {
        updateAccess(state, access) {
            state.access = access.slice();
        },
        addRouter(state, route) {
            state.router.push(route);
        }
    },
    actions: {
        updateAccess({commit}, access) {
            commit('updateAccess', access);
        },
        addRouter({commit}, route) {
            commit('addRouter', route);
        }
    }
};