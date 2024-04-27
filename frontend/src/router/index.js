import { createWebHistory, createRouter } from 'vue-router'
import RankingPage from '../page/RankingPage.vue'
import RatingPage from '../page/RatingPage.vue'
import HomePage from '../page/HomePage.vue'

const routes = [
  { path: '/ranking', component: RankingPage },
  { path: '/rating', component: RatingPage },
  { path: '/', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
