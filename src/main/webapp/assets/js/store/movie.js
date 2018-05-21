import {setAuthorizationHeader} from '../common/header.js'

const SET_MOVIES = 'SET_MOVIES';
const SET_COUNT = 'SET_COUNT';
const CLEAR_MOVIES = 'CLEAR_MOVIES';
const CREATE_MOVIE = 'CREATE_MOVIE';
const PAGE_MOVIE = 'PAGE_MOVIE';
const SAVE_MOVIE = 'SAVE_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';

const movie = {
    namespaced: true,
    state: {
        movies: [],
        itemsCount: 0,
        lastParams: {},
        pageMovie: {},
    },
    mutations: {
        SET_MOVIES(state, data) {
            state.movies = data;
        },
        PAGE_MOVIE(state, data) {
            state.pageMovie = {...data};
        },
        CREATE_MOVIE(state, data) {
            state.movies.push(data);
            state.itemsCount = state.itemsCount + 1;
        },
        SAVE_MOVIE(state, data) {
            state.pageMovie = {...data};
            state.movies = state.movies.map(function (item) {
                if (item.id === data.id) {
                    item = state.pageMovie;
                }
                return item;
            });
        },
        DELETE_MOVIE(state, id) {
            state.movies = state.movies.filter(function (item) {
                if (item.id === id) {
                    state.itemsCount = state.itemsCount - 1;
                    return false;
                } else {
                    return true;
                }
            });
        },
        SET_COUNT(state, data) {
            state.itemsCount = data;
        },
        CLEAR_MOVIES(state) {
            state.movies = [];
            state.itemsCount = 0;
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        },
        itemsCount(state) {
            return state.itemsCount;
        },
        pageMovie(state) {
            return state.pageMovie;
        },
    },
    actions: {
        // API Calls
        async getMovies({dispatch, commit, getters, rootGetters}, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                this.lastParams = data;
                const response = await axios.get('/rest/movies', {params: this.lastParams});
                commit(SET_MOVIES, response.data);
                const itemCount = await dispatch('getCount', this.lastParams);
                commit(SET_COUNT, itemCount.data);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async getMovie({dispatch, commit, getters, rootGetters}, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.get('/rest/movies/' + data);
                commit(PAGE_MOVIE, response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createMovie({dispatch, commit, getters, rootGetters},
                          {title, director, genre, rating, year}) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.post('/rest/movies/', {
                    title,
                    director,
                    genre,
                    rating: parseInt(rating),
                    year: parseInt(year)
                });
                commit(CREATE_MOVIE, response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async saveMovie({dispatch, commit, getters, rootGetters},
                        {id, title, director, genre, rating, year}) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.put('rest/movies/' + id, {
                    id,
                    title,
                    director,
                    genre,
                    rating: parseInt(rating),
                    year: parseInt(year)
                });
                commit(SAVE_MOVIE, response.data);
                commit(PAGE_MOVIE, response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteMovie({dispatch, commit, getters, rootGetters}, {id}) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                const response = await axios.delete('/rest/movies/' + id);
                commit(DELETE_MOVIE, id);
                await dispatch('getMovies', this.lastParams);
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async loadSeed({dispatch, commit, getters, rootGetters}, data) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.post('/rest/load/', {});
            } catch (error) {
                throw error;
            }
        },

        async getCount({dispatch, commit, getters, rootGetters}, {field, searchTerm}) {
            try {
                setAuthorizationHeader(rootGetters['auth/accessToken']);
                return await axios.get('/rest/movies/count/', {params: {field, searchTerm}});
            } catch (error) {
                throw error;
            }
        },

        // Only Mutations
        async cleaкMovies({dispatch, commit, getters, rootGetters}) {
            try {
                commit(CLEAR_MOVIES);
            } catch (error) {
                throw error;
            }
        },
    }
};

export default movie
