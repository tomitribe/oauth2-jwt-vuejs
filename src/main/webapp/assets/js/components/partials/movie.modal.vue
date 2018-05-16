<template>
    <div class="modal fade ux-movie-window" id="movieModal" tabindex="-1" role="dialog" aria-labelledby="movieModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-header-detached">
                <form class="form-horizontal ux-movie-form" role="form" id="uxMovieForm">
                    <div class="modal-header d-flex justify-content-center">
                        <h3 class="modal-title font-weight-light" id="movieModalLabel">{{"movie"}}</h3>
                        <button type="button" class="ux-close close close-x font-weight-light"
                                data-dismiss="modal" aria-hidden="true">&times;
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="title" class="col-12 mb-0 text-muted control-label">{{"title"}}</label>

                            <div class="col-12">
                                <input class="form-control ux-title" id="title" placeholder="title"
                                       type="text" v-model="item.title" name="title" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="director" class="col-12 mb-0 text-muted control-label">{{"director"}}</label>

                            <div class="col-12">
                                <input class="form-control ux-director" id="director"
                                       type="text" placeholder="director" v-model="item.director" name="director"
                                       required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="genre" class="col-12 mb-0 text-muted control-label">{{"genre"}}</label>

                            <div class="col-12">
                                <input class="form-control ux-genre" id="genre" placeholder="genre"
                                       type="text" v-model="item.genre" name="genre" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="rating" class="col-12 mb-0 text-muted control-label">{{"rating"}}</label>

                            <div class="col-12">
                                <input class="form-control ux-rating" id="rating"
                                       type="number" min="0" max="10" placeholder="rating"
                                       v-model="item.rating" name="rating" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="year" class="col-12 mb-0 text-muted control-label">{{"year"}}</label>

                            <div class="col-12">
                                <input class="form-control ux-year" id="year" placeholder="year"
                                       type="number" min="1900" :max="currentYear" v-model="item.year" name="year"
                                       required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default ux-close" data-dismiss="modal">
                            {{"close"}}
                        </button>
                        <button type="submit" class="btn btn-primary ux-save">{{"save"}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: {'item': {
           default: function () { return {
               title: '',
               director: '',
               rating: '',
               year: this.currentYear,
           } }
        }},
        computed: {
            currentYear() {
                return (new Date()).getFullYear();
            }
        }
    }
</script>

<style>
</style>
