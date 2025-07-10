import { createMemoryHistory, createRouter } from "vue-router";
import Main from "../pages/Main.vue";
import Settings from "../pages/Settings.vue";

const routes = [
    { path: "/", component: Main },
    { path: "/settings", component: Settings },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
