<template>
    <div class="ux-main">
        <div class="row">
            <div class="col-md-12">
                <div class="mx-auto text-center mb-3 mt-3">
                    <h3 class="pt-4 pb-2">{{"movies"}}</h3>
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
                                       placeholder="Search for anything" autofocus>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary dropdown-toggle border-0 rounded-0 pr-3"
                                            type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                        <span class="ux-selected-filter">{{"title"}}</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" role="menu"
                                         aria-labelledby="dropdownMenuButton">
                                        <a data-option="title" class="dropdown-item ux-filter">{{"title"}}</a>
                                        <a data-option="director" class="dropdown-item ux-filter">{{"director"}}</a>
                                        <a data-option="genre" class="dropdown-item ux-filter">{{"genre"}}</a>
                                        <a data-option="rating" class="dropdown-item ux-filter">{{"rating"}}</a>
                                        <a data-option="year" class="dropdown-item ux-filter">{{"year"}}</a>
                                    </div>
                                </div>
                            </div>
                            <table class="table">
                                <thead class="thead-gray">
                                <tr>
                                    <th scope="col" class="font-weight-normal pl-4 pt-1 pb-1">{{"title"}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"director"}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"genre"}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"rating"}}</th>
                                    <th scope="col" class="font-weight-normal pt-1 pb-1">{{"year"}}</th>
                                    <th scope="col" class="font-weight-normal pr-4"></th>
                                </tr>
                                </thead>
                                <tbody class="tbody-gray">
                                <template>
                                    <table-row v-for="item in movies" v-bind:item="item"
                                             v-bind:key="item.id"></table-row>

                                </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ux-additional mx-auto row mb-3 mt-3">
                    <ul class="pagination col-9" v-if="movies.length">
                        <template>
                            <table-paginator-item v-for="(n, i) in Math.ceil(itemsCount / max)"
                                                  v-bind:page-text="i"
                                                  v-bind:page-number="n"
                                                  v-bind:active-page="page">{{n}}</table-paginator-item>

                        </template>
                    </ul>
                    <a class="load-data col-9" href="" v-if="!movies.length"
                       v-on:click.prevent.self="loadSeed()">Click here to load sample data</a>
                    <button type="button" class="col-3 btn btn-primary ux-add-btn float-right">{{"add.movie"}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const tableRow = loadVueTemplate('table/table-row');
    const tablePaginatorItem = loadVueTemplate('table/table-paginator-item');
    module.exports = {
        components: {
            'table-row': tableRow,
            'table-paginator-item': tablePaginatorItem,
        },
        /*props: {
            page: {
                default: 1,
                type: Number
            },
            field: {
                default: 'title',
                type: String
            },
            value: {
                default: '',
                type: String
            },
        },*/
        data: function () {
            return {
                max: 5,
                page: this.$route.params.page,
                field: this.$route.params.field,
                value: this.$route.params.value,
            }
        },
        computed: {
            ...Vuex.mapState({
                user: state => state.auth.user,
                movies: state => state.movie.movies,
                itemsCount: state => state.movie.itemsCount
            })
        },
        mounted() {
            this.getMoviesPage();
        },
        methods: {
            getMoviesPage: function() {
                const { page, field, value } = this.$route.params,
                    data = { max: this.max };
                if (page > 1) this.page = page;
                data.first = (this.page - 1) * this.max;
                if (field && value) {
                    data.field = field;
                    data.searchTerm = value;
                }
                this.$store.dispatch('movie/getMovies', data);
            },
            loadSeed: function() {
                try {
                    this.$store.dispatch('movie/loadSeed');
                } catch (error) {
                    this.$toasted.error((error && error.response && error.response.data && error.response.data.error_description) || 'Failed to load seed.')
                }
            }
        }
    }
</script>
