import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 导航守卫是为了防止非法登录(通过token判断有没有登录  在前端js当中使用)

// a路由跳转b路由之前会执行
router.beforeEach(function (to, from, next) {
  // console.log(to) // 去哪
  // console.log(from) // 从哪来
  if (to.path === '/login') return next()
  let tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
