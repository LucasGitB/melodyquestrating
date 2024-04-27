import { createWebHistory, createRouter } from 'vue-router'
import RankingPage from '../page/RankingPage.vue'
import RatingPage from '../page/RatingPage.vue'

const routes = [
  { path: '/ranking', component: RankingPage },
  { path: '/rating', component: RatingPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
