import { createRouter, createWebHistory } from 'vue-router';
import Home from "./pages/Home.vue"
import Assesment from "./pages/Assesment.vue"
import Result from "./pages/Result.vue"
import { useWidgetStore } from './stores/widget'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/assesment',
        name: 'Assesment',
        component: Assesment,
    },
    {
        path: '/result',
        name: 'Result',
        component: Result,
    },
    // Add more routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const store = useWidgetStore();
    if (!store.isUserLogin && to.name !== 'Home') {
        return { name: 'Home' }
    }
    if (store.assesmentCompeted && to.name === "Assesment") {
        return { name: 'Result' }
    }
})

export default router;