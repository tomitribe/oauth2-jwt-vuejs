<template>
    <div class="ux-movie-page">
        <div class="row">
            <div class="col-md-12">
                <div class="mx-auto mb-1 mt-4 d-flex px-5 py-3 align-items-end justify-content-between">
                    <h3 class="font-weight-normal pl-1 mb-2">{{pageMovie.title}} ({{pageMovie.year}})</h3>
                    <div class="btn-group mb-2 pr-1">
                        <span class="fa fa-ellipsis-h ux-hover-dots" data-toggle="dropdown" aria-haspopup="true"
                              aria-expanded="false"></span>
                        <div class="dropdown-menu dropdown-menu-right">
                            <button @click="showMovieWindow()" class="ux-edit-movie dropdown-item" type="button"><span
                                    class="col-2 fa fa-edit p-0 text-info"></span><span class="col-10">Edit</span>
                            </button>
                            <button href="delete" class="ux-delete-row dropdown-item" type="button" hidden><span
                                    class="col-2 fa fa-trash-alt p-0 text-danger"></span><span
                                    class="col-10">Delete</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="mx-auto">
                    <div class="card">
                        <div class="card-body px-0 py-0">
                            <div class="container px-5 py-4">
                                <div class="row my-3">
                                    <div class="col m-1">
                                        <div class="text-light-gray mb-3">TITLE</div>
                                        <h5 class="font-weight-normal">{{pageMovie.title}}</h5>
                                    </div>
                                    <div class="col m-1">
                                        <div class="text-light-gray mb-3">DIRECTOR</div>
                                        <h5 class="font-weight-normal">{{pageMovie.director}}</h5>
                                    </div>
                                    <div class="col m-1">
                                        <div class="text-light-gray mb-3">GENRE</div>
                                        <h5 class="font-weight-normal">{{pageMovie.genre}}</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col m-1">
                                        <div class="text-light-gray mb-3">RATING</div>
                                        <h5 class="font-weight-normal"><i class="fa fa-star text-warning"></i>
                                            {{pageMovie.rating}}/10</h5>
                                    </div>
                                    <div class="col m-1">
                                        <div class="text-light-gray mb-3">YEAR</div>
                                        <h5 class="font-weight-normal">{{pageMovie.year}}</h5>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </div>
                            <hr/>
                            <div class="container px-5 py-4">
                                <div class="row">
                                    <div class="col">
                                        <div class="ux-comments">
                                            <h5>COMMENTS</h5>
                                            <div v-for="comment in pageMovie.comments" class="row comment-mock"
                                                 v-bind:class="['comment-' + comment.id]">
                                                <div class="col">
                                                    <div class="mt-3 g-mb-30 media-comment d-flex">
                                                        <a :title="comment.author">
                                                            <img class="rounded-circle mr-3"
                                                                 :src="comment.email | gravatar"
                                                                 height="50" width="50">
                                                        </a>
                                                        <div class="media-body">
                                                            <div class="d-flex">
                                                                <h5 class="h5 mb-0">{{comment.author}}</h5>
                                                                <a :title="comment.timestamp | java2jsString"><span
                                                                        class="ml-2 text-muted text-lowercase">{{comment.timestamp | formatTime}}</span></a>
                                                            </div>
                                                            <p class="text-muted">{{comment.comment}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row comment-mock">
                                                <div class="col">
                                                    <div class="mt-3 g-mb-30 media-comment d-flex">
                                                        <a :title="user.name">
                                                            <img class="ux-avatar rounded-circle mr-3"
                                                                 :src="user.email | gravatar" height="50" width="50">
                                                        </a>
                                                        <div class="media-body">
                                                            <form class="form-comment" v-on:submit.prevent
                                                                  autocomplete="off">
                                                                <textarea class="form-control" placeholder="Message..."
                                                                          name="comment"></textarea>
                                                                <button class="btn float-right btn-primary my-3 ux-send-comment"
                                                                        type="submit">Comment
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <movie-modal v-model="pageMovie"></movie-modal>
    </div>
</template>

<script>
    module.exports = {
        components: {},
        computed: {
            ...Vuex.mapState({
                user: state => state.auth.user,
                pageMovie: state => state.movie.pageMovie
            }),
            id: {
                get() {
                    return this.$route.params.id;
                },
                set(id) {
                    this.$router.replace({params: {id: id || undefined}});
                }
            },
        },
        mounted() {
            const vm = this;
            this.getMovie(vm.id);
        },
        methods: {
            async getMovie(id) {
                await this.$store.dispatch('movie/getMovie', id);
            },
            showMovieWindow() {
                const vm = this, modal = $('#movieModal').modal();
                modal.on('hidden.bs.modal', function () {
                    vm.getMovie(vm.id);
                });
            }
        }
    }
</script>
