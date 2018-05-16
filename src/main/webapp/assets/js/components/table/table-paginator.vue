<template>
    <ul class="pagination col-9">
        <table-paginator-item v-for="(page, index) in pages"
                              v-bind:page="page"
                              v-bind:key="index"
        ></table-paginator-item>
    </ul>
</template>

<script>

    const tablePaginatorItem = loadVueTemplate('table/table-paginator-item');
    module.exports = {
        components: {
            'table-paginator-item': tablePaginatorItem,
        },
        props: ['itemsCount', 'max', 'currentPage'],
        computed: {
            pagesCount() {
                return Math.ceil(this.itemsCount / this.max);
            },
            pages() {
                const pages = Array.from(Array(this.pagesCount).keys()).map(i => {
                    i += 1;
                    return {pageText: i, pageNumber: i, isActive: i === this.currentPage}
                });
                pages.unshift({pageText: '<<', pageNumber: 1, isActive: false});
                pages.push({pageText: '>>', pageNumber: this.pagesCount, isActive: false});
                return pages;
            },
        },
    }
</script>

<style>
</style>
