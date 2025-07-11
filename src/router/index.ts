import { createMemoryHistory, createRouter } from "vue-router";
import Main from "../components/pages/main/Main.vue";

const routes = [
    {
        path: "/",
        component: Main,
    },
    {
        path: "/settings",
        component: () => import("../components/pages/settings/Settings.vue"),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
