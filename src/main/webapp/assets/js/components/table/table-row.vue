<template>
    <tr class="col s12 m6">
        <td class="align-middle pl-4 pt-4 pb-4">
            <a :href="'movie/'+item.id" class="ux-goto-movie font-weight-bold">{{item.title}}</a>
        </td>
        <td class="align-middle pt-4 pb-4">{{item.director}}</td>
        <td class="align-middle pt-4 pb-4">{{item.genre}}</td>
        <td class="align-middle pt-4 pb-4"><i class="fa fa-star text-warning"></i> {{item.rating}}/10</td>
        <td class="align-middle pt-4 pb-4">{{item.year}}</td>
        <td class="align-middle pr-4 pt-4 pb-4">
            <div class="btn-group">
                <span class="fa fa-ellipsis-h ux-hover-dots" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false"></span>
                <div class="dropdown-menu dropdown-menu-right">
                    <button @click="showMovieWindow(item)" class="ux-edit-row dropdown-item" type="button"><span
                            class="col-2 fa fa-edit p-0 text-info"></span><span class="col-10">Edit</span></button>
                    <button @click="$modal.show('delete-movie')" class="ux-delete-row dropdown-item" type="button"><span
                            class="col-2 fa fa-trash-alt p-0 text-danger"></span><span class="col-10">Delete</span>
                    </button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    module.exports = {
        props: ['item'],
        methods: {
            showMovieWindow(model) {
                $('#movieModal').modal();
            }
        }
    }
</script>

<style>
</style>
