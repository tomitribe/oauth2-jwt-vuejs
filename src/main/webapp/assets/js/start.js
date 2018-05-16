/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import router from './router.js';
import store from './store/index.js';
import { gravatar } from './common/gravatar.js';
import { i18n } from './common/i18n.js';

Vue.use(window['httpVueLoader']);

Vue.use(window['vuelidate']['Vuelidate']);

Vue.use(window['Toasted'], {
    position: 'bottom-center',
    duration: 2300
});

//Vue.use(window['vue-js-modal'].default, { dynamic: true, dialog: true });

Vue.filter('gravatar', function (value) {
    return gravatar((value||' ').toLowerCase().trim());
});


Vue.filter('i18n', function (value) {
    return i18n((value||' ').toLowerCase().trim());
});

const movieModal = loadVueTemplate('partials/movie.modal');
Vue.component('movie-modal', movieModal);

window.jQuery = window['$'];

new Vue({
    el: '#root',
    template: '<app />',
    store,
    router,
    components: {
        app: 'url:assets/js/components/app.vue'
    }
});
