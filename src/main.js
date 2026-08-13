import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router';


Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes
})


router.beforeEach((to, from, next) => {
    //判断是否有标题
    if (to.meta.title) {
        document.title = to.meta.title + ' - Designed By Srcker UI';
    }
    next();
})

Vue.use(VueRouter);
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')