<template>
    <div class="post">
        <a class="thumbnail" target="_blank" :href="post.data.url">
            <div :style="{'background-image':`url(${thumbnail})`}"></div>
        </a>
        <h3><a :href="`https://reddit.com${post.data.permalink}`" target="_blank">{{post.data.title}}</a></h3>
        <div class="details">
            <b v-if="post.data.over_18">NSFW</b>
            <b><a target="_blank" :href="'https://reddit.com/r/'+post.data.subreddit">r/{{post.data.subreddit}}</a></b>
            -
            <a target="_blank" :href="'https://reddit.com/u/'+post.data.authro">u/{{post.data.author}}</a>
        </div>

    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        props: {post: Object},
        computed: {
            thumbnail() {
                try {
                    return this.post.data.preview.images[0].resolutions[1].url.replace(new RegExp('&amp;', 'g'), '&')
                } catch (e) {
                    return null;
                }
            }
        },
        methods: {
            ...mapActions(['fetchPosts']),
            refresh() {
                this.fetchPosts([this.post.data.name])
            }

        }
    }
</script>

<style lang="scss" scoped>

    button {
        grid-row: 2;
    }

    h3 {
        grid-row: 1;
        margin: 0;
        padding: 0;

        a {
            color: black;
            text-decoration: none;
        }
    }

    .post {
        border-radius: 2px;
        margin: .5em;
        padding: .5em;
        border-bottom: 1px solid black;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: .5em;
    }
    .details{
        b {
            margin-right:1em;
            color:red;
        }
    }

    .thumbnail, .thumbnail div {
        width: 100px;
        height: 80px;
    }

    .thumbnail {
        align-self: center;
        grid-row: 1 / 3;

        div {
            border-radius: 4px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% top;
        }
    }
</style>