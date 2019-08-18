<template>
    <div class="wrapper">
        <Header :scrollTop="()=>$refs.main.scrollTo(0,0)"
                :canScrollTop="canScrollTop"
                :progress="progress"
                :pause="pause"
                v-bind:pause.sync="pause"
        />
        <main ref="main">
            <Post v-for="p in allPosts" :key="p.data.name" :post="p"/>
        </main>
        <Sidebar/>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";
    import reddit_api from "../reddit_api";
    import Post from "../components/Post";
    import Header from "../components/Header";
    import Sidebar from "../components/Sidebar";

    let timer = null;

    export default {
        name: 'home',
        components: {Sidebar, Post, Header},
        data() {
            return {ids: [], canScrollTop: false, pause: false, progress: 0, tickSpeed: 1000}
        },
        computed: {
            ...mapGetters(['allPosts', 'lastId']),
        },
        methods: {
            ...mapActions(['fetchNewPosts', 'fetchPosts']),
            tick() {
                let refreshRate = 10000;
                if (this.progress >= 100) {
                    this.progress = 0
                    this.fetchMore()
                }
                this.progress += (100 * this.tickSpeed) / refreshRate
            },
            fetchMore() {
                if (this.pause)
                    return
                this.ids = reddit_api.generate_ids(this.lastId)
                this.fetchPosts(this.ids).then(posts => {

                })
            },
            startFetch() {
                if (timer !== null)
                    clearInterval(timer)

                this.fetchNewPosts().then(new_posts => {
                    timer = setInterval(this.tick, this.tickSpeed)
                })
            }
        },
        created() {
            this.startFetch()
        },
        mounted() {
            let main = this.$refs.main;
            main.addEventListener('scroll', () => {
                this.canScrollTop = main.scrollTop > 0
            }, {passive: true})
        },
        watch: {
            pause(paused) {
                if (paused) {
                    clearInterval(timer)
                } else {
                    this.startFetch()
                }
            }
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

    @media only screen and (max-width: 800px) {
        main {
            grid-column: 1 / 3;
        }
    }
</style>
