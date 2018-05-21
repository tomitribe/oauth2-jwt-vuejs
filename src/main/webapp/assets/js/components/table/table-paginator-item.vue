<template>
    <li class="page-item" v-bind:class="{ active: page.isActive }">
        <router-link  class="page-link" :to="{ params: { page: page.pageNumber }}" :data-page="page.pageNumber" replace>
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
