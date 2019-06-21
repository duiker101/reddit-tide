<template>
    <header>
        <el-button @click="scrollTop" :disabled="!canScrollTop">Back to top</el-button>
        <el-input v-model="filter"></el-input>
        {{count}} {{newCount}}
    </header>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        props: {scrollTop: Function, canScrollTop: false},
        data() {
            return {lastTop: 0}
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
                get () {
                    return this.$store.state.filter
                },
                set (value) {
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
    }


</style>