<template>
    <header>
        <el-button @click="scrollTop" :disabled="!canScrollTop">Top</el-button>
        <el-button @click="clearPosts">Clear</el-button>
        <el-checkbox :value="pause" @change="(val)=>$emit('update:pause', val)">Pause</el-checkbox>
        <div><span class="name">Count:</span>{{count}} <span class="name">New:</span>{{newCount}}</div>
        <div class="expand">
            <el-button type="text" icon="el-icon-more" @click="openSidebar"/>
        </div>
        <div class="progress" :style="{width:progress+'%'}"></div>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        props: {scrollTop: Function, clear: Function, canScrollTop: false, pause: false, progress: 0},
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

<style lang="scss" scoped>
    header {
        grid-column: 1 / 3;
        padding: 1em;
        border-bottom: 1px solid rgba(50, 50, 50, 0.3);
        display: grid;
        grid-template-columns: 80px 80px 90px 170px;
        line-height: 40px;
        text-align: center;
    }

    .expand {
        display: none;
    }

    .el-checkbox {
        margin-left: 1em;
    }

    @media only screen and (max-width: 800px) {
        header {
            grid-template-columns: repeat(4, 1fr) auto;
        }

        .name {
            display: none;
        }

        .expand {
            display: block;
            width: 50px;
        }
    }
    .progress{
        height: 2px;
        background: blue;
    }

</style>