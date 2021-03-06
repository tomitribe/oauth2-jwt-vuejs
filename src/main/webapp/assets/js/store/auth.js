import { jwtDecode } from '../common/zip.js';
import { setAuthorizationHeader } from '../common/header.js';
import { clearCookie } from '../common/cookie.js';

const SET_USER = 'SET_USER';
const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN';
const STORE_REFRESH_TOKEN = 'STORE_REFRESH_TOKEN';
const LOGOUT_USER = 'LOGOUT_USER';

const auth = {
    namespaced: true,
    state: {
        user: null,
        accessToken: null,
        refreshToken: null
    },
    mutations: {
        SET_USER (state, data) {
            state.user = data
        },
        STORE_ACCESS_TOKEN (state, accessToken) {
            state.accessToken = accessToken;
            setAuthorizationHeader(state.accessToken);
            localStorage.setItem('accessToken', accessToken)
        },
        STORE_REFRESH_TOKEN (state, refreshToken) {
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken)
        },
        LOGOUT_USER (state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            setAuthorizationHeader(state.accessToken);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken')
        }
    },
    getters: {
        user (state) {
            setAuthorizationHeader(state.accessToken);
            return state.user
        },
        accessToken (state) {
            setAuthorizationHeader(state.accessToken);
            return state.accessToken
        },
        refreshToken (state) {
            return state.refreshToken
        }
    },
    actions: {
        async setUserAndTokens ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                let decoded = jwtDecode(data.accessToken);
                commit(SET_USER, decoded.payload);
                commit(STORE_ACCESS_TOKEN, data.accessToken);
                commit(STORE_REFRESH_TOKEN, data.refreshToken);
            } catch (error) {
                throw error
            }
        },
        async userLogin ({ dispatch, commit, getters, rootGetters }, credentials) {
            try {
                const response = await axios({
                    method: 'post',
                    url: window.tokenHost || (location.origin + '/oauth2/token'),
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        username: credentials.username,
                        password: credentials.password,
                        grant_type: credentials.grant_type
                    })
                });
                // TODO: remove after endpoint moved to non-cookie one;
                clearCookie();
                return await dispatch('setUserAndTokens', {accessToken: response.data.access_token, refreshToken: response.data.refresh_token})
            } catch (error) {
                throw error
            }
        },
        async refreshUserTokens ({ dispatch, commit, getters, rootGetters }) {
            try {
                setAuthorizationHeader();
                return await axios({
                    method: 'POST',
                    url: window.tokenHost || (location.origin + '/oauth2/token'),
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        refresh_token: getters.refreshToken,
                        grant_type: 'refresh_token'
                    })
                })
            } catch (error) {
                throw error
            }
        },
        async userLogout ({ dispatch, commit, getters, rootGetters }) {
            try {
                commit(LOGOUT_USER)
            } catch (error) {
                throw error
            }
        }
    }
};

export default auth
