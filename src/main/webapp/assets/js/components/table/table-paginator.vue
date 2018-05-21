<template>
    <ul class="pagination col-9">
        <template v-for="(page, index) in pages">
            <li class="page-item disabled"
                v-if="index > 1 && index < pages.length-1 && (page.pageNumber - pages[index-1].pageNumber !== 1)">
                <span class="page-link">
                    ..
                </span>
            </li>
            <table-paginator-item v-bind:page="page"
                                  v-bind:key="index"
            ></table-paginator-item>
        </template>
    </ul>
</template>

<script>

    const tablePaginatorItem = loadVueTemplate('table/table-paginator-item');
    module.exports = {
        components: {
            'table-paginator-item': tablePaginatorItem,
        },
        props: ['itemsCount', 'max', 'currentPage', 'pagesCount'],
        computed: {
            pages() {
                const pages = [];
                Array.from(Array(this.pagesCount).keys()).map(ci => {
                    ci += 1;
                    if (ci < 3 || Math.abs(ci - this.currentPage) < 3 || Math.abs(ci - this.pagesCount) < 2) {
                        pages.push({pageText: ci, pageNumber: ci, isActive: ci === this.currentPage});
                    }
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
