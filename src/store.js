import Vue from 'vue'
import Vuex from 'vuex'
import reddit_api from "./reddit_api";
import * as moment from "moment";
import * as queryString from "query-string";

Vue.use(Vuex)

let query = queryString.parse(location.search)
let defFilter = query.data ? JSON.parse(atob(query.data)).filters : {}

function updateQuery(filters){
    let data = btoa(JSON.stringify({filters}));
    let url = window.location.origin + '/?data=' + encodeURIComponent(data);
    window.history.pushState({path: url}, '', url);
}

export default new Vuex.Store({
    state: {
        posts: [],
        last: null,
        pause: false,
        filters: defFilter,
        sidebar: false
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        lastId(state) {
            return state.last
        },
        filters(state) {
            return Object.values(state.filters)
        },
        sidebarVisible(state) {
            return state.sidebar
        }
    },
    mutations: {
        setPosts(state, posts) {
            if (posts.length <= 0)
                return;
            let new_posts = posts.filter(p => {
                try {
                    for (let filter of Object.values(state.filters)) {
                        if (!testFilter(p, filter))
                            return false;
                    }
                } catch (e) {
                    console.log(e)
                    return false;
                }
                return true;
            })

            new_posts = [...state.posts, ...new_posts]
            // todo limit amount of posts in history?
            state.posts = new_posts.sort((a, b) => b.data.created_utc - a.data.created_utc)
            state.last = posts[0].data.id
        },
        clearPosts(state) {
            state.posts = []
        },
        setSidebar(state, open) {
            state.sidebar = open;
        },
        setFilter(state, {id, filter}) {
            state.filters[id] = filter
            updateQuery(state.filters)
        },
        addFilter(state, filter) {
            let keys = Object.keys(state.filters)
            let id = 0;
            if (keys.length > 0)
                id = parseInt(keys.sort()[keys.length - 1]) + 1
            if (filter === null)
                filter = {attribute: '', action: 'is', value: '', id}
            else
                filter.id = id
            state.filters = {...state.filters, [id]: filter}
            updateQuery(state.filters)
        },
        removeFilter(state, id) {
            let filters = {...state.filters}
            delete filters[id]
            state.filters = filters
            updateQuery(state.filters)
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
        },
        clearPosts({commit}) {
            commit('clearPosts')
        },
        openSidebar({commit}) {
            commit('setSidebar', true)
        },
        closeSidebar({commit}) {
            commit('setSidebar', false)
        },
        addFilter({commit}, filter) {
            commit('addFilter', filter)
        },
        setFilter({commit}, payload) {
            commit('setFilter', payload)
        },
        removeFilter({commit}, id) {
            commit('removeFilter', id)
        }
    }
})

function testFilter(post, f) {
    let value = post.data[f.attribute];
    if (value === undefined)
        value = null
    else
        value = value + ''
    let fvalue = f.value + ''

    switch (f.action) {
        case 'is':
            if (value === fvalue || value + '' === fvalue + '')
                return true;
            break;
        case 'is_not':
            if (value !== fvalue && value + '' !== fvalue + '')
                return true;
            break;
        case 'contains':
            if (value !== null && (value + '').indexOf(fvalue) >= 0)
                return true;
            break;
        case 'not_contains':
            if (value === null || value.indexOf(fvalue) < 0)
                return true;
            break;
        case 'less_than':
            if (parseFloat(value) < parseFloat(fvalue))
                return true;
            break;
        case 'more_than':
            if (parseFloat(value) > parseFloat(fvalue))
                return true;
            break;
        default:
            return false;

    }
}

