import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import axios from 'axios'

Vue.use(Router)

let room = /^\/room\/\d{1,6}$/
let flag = false

//检查该浏览器是否有登录状态

for (let key in localStorage) {
    if (key === 'token') {
        console.log('d')
        flag = true
        let payload = {
            name: localStorage.name,
            token: localStorage.token,
            id: Number(localStorage.id)
        }
        store.commit('load', payload)
    }
}

//检查登录是否过期
if (flag) {
    if (store.state.token !== '') {
        store.commit('getUser')
    }
} else {
    localStorage.setItem('name', store.state.name)
    localStorage.setItem('token', store.state.token)
    localStorage.setItem('id', store.state.id.toString(10))
}

//查看房间链接是否合法

let roomId = location.pathname
console.log('id is' + roomId)
console.log(room.test(roomId))
console.log((/^(\/room\/)(\d{1,6})$/.exec(roomId)))
if (room.test(roomId)) {
    console.log(room)
    let id = Number(/^(\/room\/)(\d{1,6})$/.exec(roomId)[2])
    store.commit('putRoom', id)
        // if (store.state.isLogin === true) {
        //     axios
        //         .get(
        //             location.protocol + '//' + '118.126.104.223' + ':80/admin/room_get', {
        //                 params: {
        //                     roomid: id,
        //                     token: store.state.token
        //                 }
        //             }
        //         )
        //         .then((res) => {
        //             store.commit('putIn', res.data)
        //         })
        // }
} else {
    //alert('房间链接错误')
}

var router = new Router({
    mode: 'history',
    routes: [{
            name: 'home',
            path: '/',
            component: () =>
                import ('@/components/home')
        },
        {
            name: 'chat',
            path: '/chat',
            component: () =>
                import ('@/components/chat')
        },
        {
            name: 'edit',
            path: '/edit',
            component: () =>
                import ('@/components/edit')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    //${//to and from are Route Object,next() must be called to resolve the hook}
    if (store.state.isLogin === true) {
        if (to.name === "chat" && store.state.room != 0) {
            axios
                .get(
                    location.protocol + '//' + '118.126.104.223' + ':80/admin/room_get', {
                        params: {
                            roomid: store.state.room,
                            token: store.state.token
                        }
                    }
                )
                .then((res) => {
                    store.commit('putIn', res.data.room)
                })
        }
        next()
    } else {
        if (to.name === "chat" || to.name === "edit") {
            router.replace({ path: '/' })
            next(false)
        } else {
            next()
        }
    }
})

export default router