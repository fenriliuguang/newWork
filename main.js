// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'


import qs from 'qs'



// 添加响应拦截器

//axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8'

// axios.interceptors.request.use(

//     config => {

//         if (config.method === 'post') {

//             config.data = qs.stringify(config.data)

//         }

//         return config

//     },

//     error => {

//         console.log(error)

//         Promise.reject(error)

//     }

// )

Vue.prototype.$VueSocketIO = VueSocketIO;
Vue.prototype.$axios = axios;


Vue.use(ElementUI)

Vue.use(new VueSocketIO({
    debug: true,
    connection: location.protocol + '//' + '118.126.104.223' + '/chat'
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})