<template>
    <div id="app" class="app">
        <router-view/>
    </div>
</template>
<script>
    import Header from "./components/Header";

    export default {
        components: {Header}
    }
</script>

<style>
    body {
        padding: 0;
        margin: 0;
        min-height: 100%;
    }

    html {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html, body, .app {
        height: 100%;
        min-height: 100%;
    }
</style>

<style lang="scss">
    .app {
    }
</style>
