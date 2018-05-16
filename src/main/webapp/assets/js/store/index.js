const Vuex = window['Vuex'];

Vue.use(Vuex);

import auth from './auth.js'
import movie from './movie.js'

const store = new Vuex.Store({
    modules: {
        auth,
        movie
    }
});

export default store
