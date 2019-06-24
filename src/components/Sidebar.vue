<template>
    <div class="sidebar" :class="{open:sidebarVisible}">
        <div v-if="sidebarVisible" class="header">
            <el-button icon="el-icon-close" @click="closeSidebar" circle></el-button>
        </div>
        <el-button icon="el-icon-plus" @click="addFilter"/>
        <FilterItem v-for="f in filters" :filter="f" :key="f.id"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import FilterItem from "./Filter";

    export default {
        components: {FilterItem},
        computed: {
            ...mapGetters(['sidebarVisible','filters'])
        },
        methods: {
            ...mapActions(['closeSidebar','addFilter'])
        }

    }
</script>

<style lang="scss" scoped>
    .sidebar{
        padding:1em;
    }

    @media only screen and (max-width: 800px) {
        .sidebar {
            display: none;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background: white;
            box-shadow: -10px 0 10px rgba(0,0,0,0.5);
            z-index: 2;
        }

        .sidebar.open {
            display: block;
        }
    }
</style>