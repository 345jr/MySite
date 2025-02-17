import { createRouter , createWebHashHistory } from "vue-router";
import HomeView from "@/view/HomeView.vue";
import AboutMe from "@/view/AboutMe.vue";
import NotFound from "@/view/NotFound.vue";
import WorkList from "@/view/WorkList.vue";
import ArtclePage from "@/view/ArtclePage.vue";
const router = createRouter({ 
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/about",
            name: "about",
            component: AboutMe
        },
        {
            path: "/work",
            name: "works",
            component: WorkList
        },
        {
            path:"/page/:id",
            name: "page",
            component: ArtclePage
        },
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            component: NotFound
        },
    ]
})
export default router;