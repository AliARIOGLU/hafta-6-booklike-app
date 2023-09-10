<template>
    <app-header />
    <div class="flex flex-row">
        <side-bar />
        <!-- <component :is="$route.meta.componentName" :items="bookmarkList" /> -->
        <!-- <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList" />
        <p v-else>There is no bookmark...</p> -->
    </div>
</template>


<script>
import sideBar from "@/components/account/sideBar"

export default {
    components: {
        sideBar,

    },
    data() {
        return {
            bookmarkList: [],
        }
    },
    created() {
        this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((bookmark_list_response) => {
            this.bookmarkList = bookmark_list_response?.data
            // console.log(bookmark_list_response)
        })
    },
}
</script>