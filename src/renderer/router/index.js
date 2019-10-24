import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/login'
import PatientDetail from '@/pages/patientDetail'
import UserSet from '@/pages/userSet'
import LandingPage from '@/components/LandingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { index: 0 },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { index: 1 },
    },
    {
      path: '/userSet',
      name: 'UserSet',
      component: UserSet,
      meta: { index: 2 },
    },
    {
      path: '/patientDetail/:patient_name',
      name: 'PatientDetail',
      component: PatientDetail,
      meta: { index: 3 },
    },
  ]
})
