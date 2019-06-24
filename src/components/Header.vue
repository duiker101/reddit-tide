<template>
    <header>
        <el-button @click="scrollTop" :disabled="!canScrollTop">Back to top</el-button>
        <el-button @click="clearPosts">Clear</el-button>
        <el-checkbox :value="pause" @change="(val)=>$emit('update:pause', val)">Pause</el-checkbox>
        {{count}} {{newCount}}
        <div class="expand">
            <el-button icon="el-icon-more" @click="openSidebar" circle></el-button>
        </div>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        props: {scrollTop: Function, clear: Function, canScrollTop: false, pause: false},
        data() {
            return {lastTop: 0, pp: this.pause}
        },
        methods: {
            ...mapActions(["clearPosts", "openSidebar"])
        },
        computed: {
            ...mapGetters(['allPosts']),
            count() {
                return this.allPosts.length
            },
            newCount() {
                return !this.canScrollTop ? 0 : this.allPosts.length - this.lastTop;
            },
            filter: {
                get() {
                    return this.$store.state.filter
                },
                set(value) {
                    this.$store.commit('setFilter', value)
                }
            }
        },
        watch: {
            canScrollTop(val) {
                this.lastTop = val ? this.count : 0
            }
        }
    }
</script>

<style scoped>
    header {
        grid-column: 1 / 3;
        padding: 1em;
        border-bottom: 1px solid rgba(50, 50, 50, 0.3);
        display: grid;
        grid-template-columns: 300px repeat(4, 100px);
    }

    @media only screen and (max-width: 800px) {
        header {
            grid-template-columns: 300px repeat(4, 100px) 1fr auto;
        }

        .expand {
            width: 50px;
        }
    }

</style>