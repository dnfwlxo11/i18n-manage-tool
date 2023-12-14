import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import HomePage from '../pages/Home/index.vue'
import Project from '../pages/Project/index.vue'

const routes = [
  { 
    path: "/", 
    name: "HomePage", 
    component: HomePage 
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;