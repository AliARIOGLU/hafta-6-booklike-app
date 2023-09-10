<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="p-2 grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4">
            <BookMarkListItem v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>


<script>
import BookMarkListItem from "./BookmarkListItem"

export default {
    components: {
        BookMarkListItem
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        }
    }

}

</script>