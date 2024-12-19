import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const { user } = storeToRefs(useAuthStore())

  const isAuthPage = ['/login', '/register'].includes(to.path)

  if (!user.value && !isAuthPage) {
    return {
      name: '/login'
    }
  }

  if (user.value && isAuthPage) {
    return {
      name: '/'
    }
  }
})

export default router
