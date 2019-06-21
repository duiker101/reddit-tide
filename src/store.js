import Vue from 'vue'
import Vuex from 'vuex'
import reddit_api from "./reddit_api";
import * as moment from "moment";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        fetchingIds: [],
        last: null
    },
    getters: {
        allPosts(state) {
            // return Object.values(state.posts).sort((a, b) => b.data.created_utc - a.data.created_utc)
            return state.posts.sort((a, b) => b.data.created_utc - a.data.created_utc)
        },
        lastId(state) {
            return state.last
        }
    },
    mutations: {
        setPosts(state, posts) {
            if (posts.length <= 0)
                return;
            let new_posts = [...state.posts, ...posts].sort((a, b) => b.data.created_utc - a.data.created_utc)
            // state.posts = new_posts.slice(0,1000)
            state.posts = new_posts
            // state.last = posts.sort((a, b) => parseInt(b.data.id,36) - parseInt(a.data.id,36))[0].data.id
            state.last = posts[0].data.id
        },
    },
    actions: {
        fetchNewPosts({commit}) {
            return reddit_api.fetch_new_posts().then(data => {
                commit('setPosts', data.children)
                return data.children
            });
        },
        fetchPosts({commit}, ids) {
            return reddit_api.fetch_posts_by_id(ids).then(data => {
                let now = moment.utc().unix() - 10
                commit('setPosts', data.children.filter(d => d.data.created_utc < now))
                return data.children
            });
        }
    }
})
