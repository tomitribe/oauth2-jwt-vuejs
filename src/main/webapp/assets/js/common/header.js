export function setAuthorizationHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function setAxiosDefaults(store, router) {
    axios.defaults.baseURL = window.ux.ROOT_URL;
    axios.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        let originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const rt = store.getters['auth/refreshToken'];
                if (!rt) throw new Error('No valid refreshToken');
                const response = await store.dispatch('auth/refreshUserTokens');
                await store.dispatch('auth/setUserAndTokens', {
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token
                });
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                originalRequest.baseURL = '';
                setAuthorizationHeader(response.data.access_token);
                return axios(originalRequest)
            } catch (error) {
                // All Vuex modules must logout here
                await store.dispatch('auth/userLogout');

                router.replace({name: 'login'});
                Vue.toasted.error('To verify your session, please login.');
                return Promise.reject(error)
            }
        } else if(error && error.data && error.data.message) {
            Vue.toasted.error(error.data.message);
        }
        return Promise.reject(error)
    });
}
