const Vuex = window['Vuex'];

Vue.use(Vuex);

import auth from './auth.js'
import movie from './movie.js'
import modal from './modal.js'

const store = new Vuex.Store({
    modules: {
        auth,
        movie,
        modal
    }
});

export default store
