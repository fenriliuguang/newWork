import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roomIn: new Object,
        room: 0,
        face: '',
        isLogin: false,
        token: '',
        name: '',
        id: 0,
        intro: '',
        em: '',
        phone: '',
        cou: '',
    },
    mutations: {
        registered(state) {
            state.isLogin = true
        },
        load(state, n) {
            state.token = n.token
            state.name = n.name
            state.id = n.id
            localStorage.token = n.token
            localStorage.name = n.name
            localStorage.id = n.id
        },
        get(state, n) {
            state.user = n;
        },
        getUser(state) {
            console.log('get')
            axios
                .get(
                    location.protocol + '//' + '118.126.104.223' + ':80/admin/get_user', {
                        params: {
                            token: state.token,
                            id: state.id
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status === 2000) {
                        state.isLogin = true
                        state.face = res.data.user.face
                        console.log(state.face)
                        let user = eval('(' + res.data.user.info + ')')
                        state.phone = user.phone
                        state.em = user.em
                        state.intro = user.intro
                        state.cou = user.cou
                    }
                })
        },
        putRoom(state, n) {
            state.room = n
        },
        putIn(state, n) {
            state.roomIn = n
        }
    }
})

export default store