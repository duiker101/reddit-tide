<template>
    <div class="wrapper">
        <Header :scrollTop="()=>$refs.main.scrollTo(0,0)" :canScrollTop="canScrollTop"></Header>
        <main ref="main">
            <Post v-for="p in filteredPosts" :key="p.data.name" :post="p"/>
        </main>
        <div>sidebar</div>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";
    import reddit_api from "../reddit_api";
    import Post from "../components/Post";
    import Header from "../components/Header";

    export default {
        name: 'home',
        components: {Post, Header},
        data() {
            return {ids: [], canScrollTop: false}
        },
        computed: {
            ...mapGetters(['allPosts', 'lastId', 'filter']),
            filteredPosts() {
                // TODO real filter
                return this.allPosts.filter(p => {
                    try{
                        return this.filter.length <= 0 || eval(this.filter)
                    }catch(e){
                        return false
                    }
                })
            }
        },
        methods: {
            ...mapActions(['fetchNewPosts', 'fetchPosts']),
            fetchMore() {
                this.ids = reddit_api.generate_ids(this.lastId)
                this.fetchPosts(this.ids).then(posts => {

                })
            }
        },
        created() {
            this.fetchNewPosts().then(new_posts => {
                setInterval(this.fetchMore, 10000)
            })

        },
        mounted() {
            let main = this.$refs.main;
            main.addEventListener('scroll', () => {
                    this.canScrollTop = main.scrollTop > 0
                },
                {passive: true})
        }

    }
</script>
<style lang="scss" scoped>
    main {
        overflow: scroll;
        height: 100%;
    }

    .wrapper {
        height: 100%;
        min-height: 100%;

        display: grid;

        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1fr;
    }
</style>
