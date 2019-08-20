import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './components/guest/SignUp.vue'
import SignIn from './components/guest/SignIn.vue'
import DashboardHome from './components/dashboard/Home.vue'
import AddTransactions from './components/dashboard/transactions/Add.vue'
import TransactionHistory from './components/dashboard/transactions/History.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Create Account',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Create Account',
      component: SignUp
    },
    {
      path: '/register',
      name: 'Create Account',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Log In',
      component: SignIn
    },
    {
      path: '/dashboard',
      name: 'Home',
      component: DashboardHome
    },
    {
      path: '/dashboard/transactions/add',
      name: 'Add a Transaction',
      component: AddTransactions
    },
    {
      path: '/dashboard/transactions/history',
      name: 'Transaction History',
      component: TransactionHistory
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
