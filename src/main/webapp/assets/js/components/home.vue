<template>
    <div class="ux-main">
        <div class="row">
            <div class="col-md-12">
                <div class="mx-auto text-center mb-3 mt-3">
                    <h3 class="pt-4 pb-2">{{"movies" | i18n}}</h3>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="mx-auto">
                    <div class="card">
                        <div class="card-body px-0 py-0">
                            <div class="input-group mb-0 input-group-sm search-movies-bar rounded-top ">
                                <div class="input-group-prepend">
                            <span class="input-group-text border-0 rounded-0">
                                <span class="fa fa-search"></span>
                            </span>
                                </div>
                                <input type="text" class="form-control border-0 form-control-sm ux-filter-field"
                                       v-model.trim="value" debounce="300" placeholder="Search for anything" autofocus>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary dropdown-toggle border-0 rounded-0 pr-3"
                                            type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                        <span class="ux-selected-filter">{{field | i18n}}</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" role="menu"
                                         aria-labelledby="dropdownMenuButton">
                                        <template v-for="item in fields">
                                            <router-link class="dropdown-item ux-filter"
                                                         :to="{ params: { field: item }}" :data-option="item" replace
                                                         :data-option="item">{{item | i18n}}
                                            </router-link>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <table class="table">
                                <thead class="thead-gray">
                                <tr>
                                    <th scope="col" class="font-weight-normal pl-4 pt-1 pb-1">{{"title" | i18n}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"director" | i18n}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"genre" | i18n}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"rating" | i18n}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"year" | i18n}}</th>
                                    <th scope="col" class="font-weight-normal pr-4"></th>
                                </tr>
                                </thead>
                                <tbody class="tbody-gray">
                                <template>
                                    <table-row v-for="item in movies" v-bind:item="item"
                                               v-bind:show-movie-window="showMovieWindow"
                                               v-bind:key="item.id"></table-row>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ux-additional mx-auto row mb-3 mt-3">
                    <table-paginator v-bind:items-count="itemsCount"
                                     v-bind:max="max"
                                     v-bind:pages-count="pagesCount"
                                     v-bind:current-page="currentPage"
                                     v-if="movies.length"></table-paginator>
                    <a class="load-data col-9" href="" v-if="!movies.length"
                       v-on:click.prevent.self="loadSeed()">{{"load.data" | i18n}}</a>
                    <button type="button" @click="showMovieWindow()"
                            class="col-3 btn btn-primary ux-add-btn float-right">{{"add.movie" | i18n}}
                    </button>
                    <movie-modal v-model="item"></movie-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const tableRow = loadVueTemplate('table/table-row');
    const tablePaginator = loadVueTemplate('table/table-paginator');
    module.exports = {
        components: {
            'table-row': tableRow,
            'table-paginator': tablePaginator,
        },
        data: function () {
            return {
                max: 5,
                currentPage: 0,
                item: undefined,
                fields: ['title', 'director', 'genre', 'rating', 'year']
            }
        },
        computed: {
            ...Vuex.mapState({
                user: state => state.auth.user,
                movies: state => state.movie.movies,
                itemsCount: state => state.movie.itemsCount
            }),
            pagesCount() {
                return Math.ceil(this.itemsCount / this.max);
            },
            page: function () {
                return this.$route.params.page;
            },
            field: {
                get() {
                    return this.$route.params.field || 'title';
                },
                set(field) {
                    this.$router.replace({params: {field: field}});
                }
            },
            value: {
                get() {
                    return this.$route.params.value;
                },
                set(value) {
                    this.$router.replace({params: {page: 1, value: value || undefined, field: this.field}});
                }
            },
        },
        mounted() {
            this.getMoviesPage();
        },
        watch: {
            '$route.params': function () {
                this.getMoviesPage();
            },
            deep: true
        },
        methods: {
            async getMoviesPage() {
                const {page, field, value, max} = this,
                    data = {max};
                let currentPage = !isNaN(page) && Number(page);
                if (currentPage < 1 || !currentPage) currentPage = 1;
                data.first = (currentPage - 1) * max;

                if (currentPage < 1 || !currentPage) currentPage = 1;
                this.$set(this, 'currentPage', currentPage);

                if (field && value) {
                    data.field = field;
                    data.searchTerm = value;
                }
                await this.$store.dispatch('movie/getMovies', data);

                if (this.pagesCount > 0 && currentPage > this.pagesCount) currentPage = this.pagesCount;
                if (page !== currentPage) {
                    this.$router.replace({params: {page: currentPage}});
                }
            },
            loadSeed() {
                try {
                    this.$store.dispatch('movie/loadSeed');
                    this.getMoviesPage();
                } catch (error) {
                    this.$toasted.error((error && error.response && error.response.data && error.response.data.error_description) || 'Failed to load seed.')
                }
            },
            async showMovieWindow(model) {
                if (model) {
                    this.item = await this.$store.dispatch('movie/getMovie', model.id);
                } else {
                    this.item = undefined;
                }
                $('#movieModal').modal();
            }
        }
    }
</script>
