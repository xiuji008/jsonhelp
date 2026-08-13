import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router';


Vue.config.productionTip = false

const router = new VueRouter({
    // GitHub Pages 为静态托管，不支持 history 回退，使用 hash 模式
    mode: 'hash',
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