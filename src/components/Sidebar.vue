<template>
    <div class="sidebar" :class="{open:sidebarVisible}">
        <div class="side-wrapper">
            <div class="header">
                <span v-if="sidebarVisible">
                    <el-button class="close" type="text" icon="el-icon-close" @click="closeSidebar" ></el-button>
                </span>
                Filters
            </div>
            <div class="actions">
                <el-button icon="el-icon-plus" @click="add"/>
                <el-select placeholder="Add Preset" v-model=preset @change="setPreset">
                    <el-option label="NSFW" value="nsfw"/>
                    <el-option label="Has thumbnail" value="thumb"/>
                    <el-option label="Is GIF" value="gif"/>
                    <el-option label="Selft Text" value="text"/>
                </el-select>
            </div>
            <FilterItem v-for="f in filters" :filter="f" :key="f.id"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import FilterItem from "./Filter";

    export default {
        components: {FilterItem},
        data() {
            return {preset: ''}
        },
        computed: {
            ...mapGetters(['sidebarVisible', 'filters'])
        },
        methods: {
            ...mapActions(['closeSidebar', 'addFilter']),
            setPreset() {
                if (this.preset === 'nsfw')
                    this.addFilter({attribute: 'over_18', action: 'is', value: 'true'})
                else if (this.preset === 'thumb')
                    this.addFilter({attribute: 'over_18', action: 'is', value: 'true'})
                else if (this.preset === 'gif')
                    this.addFilter({attribute: 'url', action: 'contains', value: '.gif'})
                else if (this.preset === 'text')
                    this.addFilter({attribute: 'is_self', action: 'is', value: 'true'})
                this.preset = ''
            },
            add() {
                this.addFilter(null)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .actions {
        margin-bottom: 1em;
    }

    .header + .actions {
        margin-top: 1em;
    }

    .header {
        border-bottom: 1px solid #ddd;
        padding-bottom: 1em;
        font-weight: 700;
    }

    .sidebar {
        width: calc(300px + 2em);
        border-left: 1px solid #ddd;
    }

    .side-wrapper {
        width: 300px;
        padding: 1em;
    }

    .close{
        padding: .3em;
    }

    @media only screen and (max-width: 800px) {
        .sidebar {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 0;
            background: white;
            z-index: 2;
            transition: width 200ms linear;
            box-sizing: border-box;
            overflow: hidden;
            box-shadow: none;
        }
        .sidebar.open {
            box-shadow: -10px 0 10px rgba(0, 0, 0, 0.2);
            width: calc(300px + 2em);
        }
    }
</style>