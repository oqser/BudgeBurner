import { createMemoryHistory, createRouter } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
    {
        path: "/",
        component: Main,
    },
    {
        path: "/settings",
        component: () => import("../views/Settings.vue"),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
