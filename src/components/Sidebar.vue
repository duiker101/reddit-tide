<template>
    <div class="sidebar" :class="{open:sidebarVisible}">
        <div class="side-wrapper">
            <div v-if="sidebarVisible" class="header">
                <el-button type="text" icon="el-icon-close" @click="closeSidebar" circle></el-button>
            </div>
            <el-button icon="el-icon-plus" @click="addFilter"/>
            <FilterItem v-for="f in filters" :filter="f" :key="f.id"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import FilterItem from "./Filter";

    export default {
        components: {FilterItem},
        computed: {
            ...mapGetters(['sidebarVisible', 'filters'])
        },
        methods: {
            ...mapActions(['closeSidebar', 'addFilter'])
        }

    }
</script>

<style lang="scss" scoped>
    .sidebar {
        width: 320px;
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
        .side-wrapper {
            width: 300px;
            padding: 1em;
        }
        .sidebar.open {
            box-shadow: -10px 0 10px rgba(0, 0, 0, 0.2);
            width: 320px;
        }
    }
</style>