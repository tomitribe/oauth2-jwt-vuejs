<template>
    <li class="page-item" v-bind:class="{ active: page.isActive }">
        <router-link  class="page-link" :to="{ name: 'home', params: { page: page.pageNumber }}" :data-page="page.pageNumber">
            {{page.pageText}}
        </router-link>
    </li>
</template>

<script>
    module.exports = {
        props: [ 'page' ]
    }
</script>

<style>
</style>
