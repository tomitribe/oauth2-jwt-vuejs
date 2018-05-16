<template>
    <li class="page-item" v-bind:class="{ active: activePage == pageNumber }">
        <router-link  class="page-link" :to="{ name: 'home', params: { page: pageNumber }}" :data-page="pageNumber">
            {{pageText}}
        </router-link>
    </li>
</template>

<script>
    module.exports = {
        props: [ 'pageText', 'pageNumber', 'activePage' ]
    }
</script>

<style>
</style>
