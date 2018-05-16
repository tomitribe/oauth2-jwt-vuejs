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

Vue.use(VueRouter);

/*
* '': 'showMain',
                    'main(/:page)': 'showMain',
                    'main/:page/:field/:value': 'showMain',
                    'login-header(/:tail)': 'showLoginHeader',
                    'login(/:tail)': 'showLogin',
                    'logout(/:tail)': 'showLogout',
                    'movie/:id': 'showMovie',
                    '*path':  'defaultRoute'
*
* */

function loadVueTemplate(url, force) {
    return httpVueLoader(!force ? 'assets/js/components/' + url + '.vue' : url);
}

window.loadVueTemplate = loadVueTemplate;

function fetchComponent(name, url) {
    return Vue.component(
        name,
        loadVueTemplate(url)
    );
}

function parseRoute(item) {
    if (!item.component) {
        item.component = fetchComponent(item.name, item.componentUrl || item.name);
    }
    if (!!item.children) {
        item.children.map(parseRoute);
    }
}

const routes = [
    {
        name: 'default',
        path: '*',
        redirect: '/login',
        meta: {title: 'Not Found'}
    },
    {
        name: 'root',
        path: '/',
        redirect: '/home/1',
        meta: {title: 'Root'}
    },
    {
        name: 'home',
        path: '/home/:page?/:field?/:value?',
        meta: {title: 'Home'}
    },
    {
        name: 'login',
        path: '/login',
        meta: {title: 'Login'}
    },
    {
        name: 'logout',
        path: '/logout',
        beforeEnter: function (to, from, next) {
            router.app.$options.store.dispatch('auth/userLogout');
            router.push({name: 'login'});
            next({name: 'login'});
        },
        meta: {title: 'logout'}
    }
];
const noAuthRoutes = ['login', 'logout'];

routes.map(parseRoute);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    routes
});

router.beforeEach((to, from, next) => {
    let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
    let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null

    if (accessToken) {
        router.app.$options.store.dispatch('auth/setUserAndTokens', {
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    }

    if ((noAuthRoutes.indexOf(to.name) < 0) && router.app.$options.store && !router.app.$options.store.getters['auth/user']) {
        next({name: 'logout'})
    }

    next()
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
    document.body.setAttribute('current-view', 'ux-' + to.name);
});

export default router
