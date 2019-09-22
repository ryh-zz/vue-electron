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
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/patientDetail/:patient_name',
      name: 'PatientDetail',
      component: PatientDetail
    },
    {
      path: '/userSet',
      name: 'UserSet',
      component: UserSet
    },
    
  ]
})
