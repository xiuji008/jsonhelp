let routes = [
    {
        name: 'home',
        path: '*',
        meta: {
            title: 'JSON在线解析及格式化验证 - JSON.help'
        },
        component: () => import('./view/json/index.vue')
    }
];

export default routes;