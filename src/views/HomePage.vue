<template>
    <AppHeader />
    <div class="flex flex-row">
        <Sidebar @category-changed="updateBookmarkList" />
        <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList" />
        <p v-else>There is no bookmark...</p>
    </div>
</template>

<script>
import Sidebar from "@/components/home/Sidebar"

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            bookmarkList: []
        }
    },
    mounted() {
        this.$socket.on("NEW_BOOKMARK_ADDED", this.fetchData)
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((bookmark_list_response) => {
                this.bookmarkList = bookmark_list_response?.data
            });
            //! Bookmark olarak eklediklerimizi çekmek için user_bookmarks üzerinden çekelim..
            this.$appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then(user_bookmark_response => {
                this.$store.commit("setBookmarks", user_bookmark_response?.data);
            });

            //! Like olarak eklediklerimizi çekmek için user_likes üzerinden çekelim..
            this.$appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then(user_likes_response => {
                this.$store.commit("setLikes", user_likes_response?.data);
            });
        },
        updateBookmarkList(categoryId) {
            const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : "/bookmarks?_expand=category&_expand=user"
            this.$appAxios.get(url).then((bookmark_list_response) => {
                this.bookmarkList = bookmark_list_response?.data
            })
        }
    }
}

</script>