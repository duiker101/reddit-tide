import Vue from 'vue'
import Vuex from 'vuex'
import reddit_api from "./reddit_api";
import * as moment from "moment";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        last: null,
        filter: ''
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        lastId(state) {
            return state.last
        },
        filter(state){
            return state.filter
        }
    },
    mutations: {
        setPosts(state, posts) {
            if (posts.length <= 0)
                return;
            let new_posts = [...state.posts, ...posts].sort((a, b) => b.data.created_utc - a.data.created_utc)
            // todo limit amount of posts in history?
            state.posts = new_posts
            state.last = posts[0].data.id
        },
        setFilter(state,filter){
            state.filter = filter
        }
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
