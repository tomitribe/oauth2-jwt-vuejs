import { setAuthorizationHeader } from '../common/header.js'

const SET_MOVIES = 'SET_MOVIES';
const SET_COUNT = 'SET_COUNT';
const CLEAR_MOVIES = 'CLEAR_MOVIES';

const movie = {
    namespaced: true,
    state: {
        movies: [],
        itemsCount: 0
    },
    mutations: {
        SET_MOVIES (state, data) {
            state.movies = data;
        },
        SET_COUNT (state, data) {
            state.itemsCount = data;
        },
        CLEAR_MOVIES (state) {
            state.movies = [];
            state.itemsCount = 0;
        }
    },
    getters: {
        movies (state) {
            return state.movies;
        },
        itemsCount (state) {
            return state.itemsCount;
        }
    },
    actions: {
        // API Calls
        async getMovies ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.get('/rest/movies', {params: data});
                commit(SET_MOVIES, response.data);
                const itemCount = await dispatch('getCount', data);
                commit(SET_COUNT, itemCount.data);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async getMovie ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.get('/rest/movies/' + data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createMovie ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.post('/rest/movies/', {title: data.title, content: data.content});
            } catch (error) {
                throw error;
            }
        },
        async saveMovie ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.put('rest/movies/' + data.id, {title: data.title, content: data.content});
            } catch (error) {
                throw error;
            }
        },
        async deleteMovie ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.delete('/rest/movies/' + data.id);
            } catch (error) {
                throw error;
            }
        },
        async loadSeed ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.post('/rest/load/', {});
            } catch (error) {
                throw error;
            }
        },
        async getCount ({ dispatch, commit, getters, rootGetters }, {field, searchTerm}) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.get('/rest/movies/count/', {field, searchTerm});
            } catch (error) {
                throw error;
            }
        },

        // Only Mutations
        async cleaкMovies ({ dispatch, commit, getters, rootGetters }) {
            try {
                commit(CLEAR_MOVIES);
            } catch (error) {
                throw error;
            }
        },
    }
};

export default movie
