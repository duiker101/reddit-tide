import axios from 'axios'

export default {
    fetch_posts_by_id(ids) {
        return axios.get('https://www.reddit.com/api/info.json', {params: {id: ids.join(',')}})
            .then(r => r.data)
            .then(r => r.data)
    },
    fetch_new_posts() {
        return axios.get('https://www.reddit.com/r/all/new/.json')
        // .then(this.handleErrors)
        // .then(r => r.json())
            .then(r => r.data)
            .then(r => r.data)
    },
    generate_ids(startingId, count = 100) {
        let ids = [];
        let start = parseInt(startingId, 36)
        // count down to make sure the newest is first
        for (let i = count; i >= 1; i--)
            ids.push((start + i).toString(36))

        return ids.map(i => 't3_' + i);
    }
}