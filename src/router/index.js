import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Classroom from '@/views/classroom'
import Login from '@/views/public/Login'

import ListCourse from '@/views/course'
import Practicum from '@/views/practicum'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/laboratory',
      name: 'Laboratory',
      component: Full,
      children: [
        {
          path: 'course',
          name: 'Course',
          component: ListCourse
        },
        {
          path: 'practicum',
          name: 'Practicum',
          component: Practicum
        }
      ]
    },
    {
      path: '/classroom',
      name: 'Classroom',
      component: Full,
      children: [
        {
          path: '',
          name: 'ClassroomManagement',
          component: Classroom
        }
      ]
    },
    {
      path: '/public',
      name: 'Public',
      redirect: '/public/login',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})
