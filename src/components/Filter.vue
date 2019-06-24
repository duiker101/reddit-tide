<template>
    <div class="filter">
        <el-select v-model="attr">
            <el-option label="Title" value="title"/>
            <el-option label="Subreddit" value="subreddit"/>
            <el-option label="Author" value="author"/>
            <el-option label="Domain" value="domain"/>
            <el-option label="NSFW" value="over_18"/>
        </el-select>
        <el-select v-model="action">
            <el-option label="is" value="is"></el-option>
            <el-option label="is not" value="is_not"></el-option>
            <el-option label="contains" value="contains"></el-option>
            <el-option label="doesn't contain" value="not_contains"></el-option>
            <el-option label="More than" value="more_than"></el-option>
            <el-option label="Less than" value="less_than"></el-option>
        </el-select>
        <el-input v-model="value"/>
        <el-button icon="el-icon-close" @click="remove" circle/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        props: {filter: Object},
        data() {
            return {attr: this.filter.attribute, action: this.filter.action, value: this.filter.value}
        },
        methods: {
            ...mapActions(['setFilter', 'removeFilter']),
            updateFilter() {
                this.setFilter({
                    id: this.filter.id,
                    filter: {attribute: this.attr, action: this.action, value: this.value, id: this.filter.id}
                })
            },
            remove() {
                this.removeFilter(this.filter.id)
            }
        },
        watch: {
            action(val) {
                this.updateFilter()
            },
            attr(val){
                this.updateFilter()
            },
            value(val){
                this.updateFilter()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .filter {
        display: grid;
        grid-template-columns: auto auto auto auto;
    }

</style>