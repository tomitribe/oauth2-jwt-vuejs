<template>
    <div class="modal fade ux-movie-window" id="movieModal" tabindex="-1" role="dialog"
         aria-labelledby="movieModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-header-detached">
                <form class="form-horizontal ux-movie-form" role="form" id="uxMovieForm" v-on:submit.prevent>
                    <div class="modal-header d-flex justify-content-center">
                        <h3 class="modal-title font-weight-light" id="movieModalLabel">{{"movie" | i18n}}</h3>
                        <button type="button" class="ux-close close close-x font-weight-light"
                                data-dismiss="modal" aria-hidden="true">&times;
                        </button>
                    </div>
                    <div class="modal-body">

                        <input type="text" v-model.trim="value.id" name="id" hidden>

                        <div class="form-group"
                             v-bind:class="{ 'has-error': $v.value.title.$error, 'has-success': !$v.value.title.$invalid && $v.value.title.$dirty }"
                        >
                            <label for="title" class="col-12 mb-0 text-muted control-label">{{"title" | i18n}}</label>

                            <div class="col-12">
                                <input class="form-control ux-title" id="title" :placeholder="'title' | i18n"
                                       type="text" v-model.trim="value.title" name="title" required>
                            </div>
                        </div>
                        <div class="form-group"
                             v-bind:class="{ 'has-error': $v.value.director.$error, 'has-success': !$v.value.director.$invalid && $v.value.director.$dirty }"
                        >
                            <label for="director" class="col-12 mb-0 text-muted control-label">{{"director" |
                                i18n}}</label>

                            <div class="col-12">
                                <input class="form-control ux-director" id="director"
                                       type="text" :placeholder="'director' | i18n" v-model.trim="value.director"
                                       name="director" required>
                            </div>
                        </div>
                        <div class="form-group"
                             v-bind:class="{ 'has-error': $v.value.genre.$error, 'has-success': !$v.value.genre.$invalid && $v.value.genre.$dirty }"
                        >
                            <label for="genre" class="col-12 mb-0 text-muted control-label">{{"genre" | i18n}}</label>

                            <div class="col-12">
                                <input class="form-control ux-genre" id="genre" :placeholder="'genre' | i18n"
                                       type="text" v-model.trim="value.genre" name="genre" required>
                            </div>
                        </div>
                        <div class="form-group"
                             v-bind:class="{ 'has-error': $v.value.rating.$error, 'has-success': !$v.value.rating.$invalid && $v.value.rating.$dirty }"
                        >
                            <label for="rating" class="col-12 mb-0 text-muted control-label">{{"rating" | i18n}}</label>

                            <div class="col-12">
                                <input class="form-control ux-rating" id="rating"
                                       type="number" min="0" max="10" :placeholder="'rating' | i18n"
                                       v-model.trim="value.rating" name="rating" required>
                            </div>
                        </div>
                        <div class="form-group"
                             v-bind:class="{ 'has-error': $v.value.year.$error, 'has-success': !$v.value.year.$invalid && $v.value.year.$dirty }"
                        >
                            <label for="year" class="col-12 mb-0 text-muted control-label">{{"year" | i18n}}</label>

                            <div class="col-12">
                                <input class="form-control ux-year" id="year" :placeholder="'year' | i18n"
                                       type="number" min="1900" :max="currentYear" v-model.trim="value.year" name="year" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default ux-close" data-dismiss="modal">
                            {{"close" | i18n}}
                        </button>
                        <button type="submit" class="btn btn-primary ux-save" @click="submit()">{{"save" | i18n}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    const currentYear = function () {
            return (new Date()).getFullYear();
        },
        defItem = {
            title: '',
            director: '',
            genre: '',
            rating: 10,
            year: currentYear(),
        };

    module.exports = {
        props: {
            'value': {
                default: function () {
                    return {...defItem}
                }
            }
        },
        computed: {
            currentYear
        },
        methods: {
            async submit() {
                const vm = this;
                if (vm.$v.$invalid) {
                    vm.$v.$touch();
                    return
                }
                try {
                    let resItem, save = !!vm.value.id;
                    if (save) {
                        resItem = await vm.$store.dispatch('movie/saveMovie', vm.value);
                    } else {
                        resItem = await vm.$store.dispatch('movie/createMovie', vm.value);
                        Object.keys(defItem).map(function(prop) {
                            vm.value[prop] = defItem[prop];
                        });
                    }
                    vm.$toasted.success(`Movie ${resItem.title} ${save ? 'saved' : 'created'}.`)
                    vm.$v.$reset();
                    $('#movieModal').modal('hide');
                } catch (error) {
                    console.log(error);
                    vm.$toasted.error((error && error.response && error.response.data && error.response.data.error_description) || 'Could not save.')
                }
            }
        },
        validations: {
            value: {
                title: {
                    required: validators.required
                },
                director: {
                    required: validators.required
                },
                genre: {
                    required: validators.required,
                    alphaNum: validators.alphaNum
                },
                rating: {
                    required: validators.required,
                    numeric: validators.numeric,
                    between: validators.between(0, 10)
                },
                year: {
                    required: validators.required,
                    numeric: validators.numeric,
                    minValue: validators.minValue(1900),
                },
            }
        },
        mounted() {
        }
    }
</script>

<style>
</style>
