import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Login from '@/views/public/Login'

import ListCourse from '@/views/course'
import Practicum from '@/views/practicum'

import ClassroomCoordinator from '@/views/classroom/coordinator'
import ClassroomPractican from '@/views/classroom/practican'
import ClassroomAssistance from '@/views/classroom/assistance'

import TaskCoordinator from '@/views/task/practicum'
import TaskClassroom from '@/views/task/classroom'
import TaskCollection from '@/views/task/collection'

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
          path: 'coordinator',
          name: 'Coordinator',
          component: ClassroomCoordinator
        },
        {
          path: 'practican',
          name: 'Practican',
          component: ClassroomPractican
        },
        {
          path: 'assistance',
          name: 'Assistance',
          component: ClassroomAssistance
        }
      ]
    },
    {
      path: '/task',
      name: 'Task',
      component: Full,
      children: [
        {
          path: 'coordinator',
          name: 'CoordinatorTask',
          component: TaskCoordinator
        },
        {
          path: 'classroom',
          name: 'ClassroomTask',
          component: TaskClassroom,
          props: true
        },
        {
          path: 'collection',
          name: 'CollectionTask',
          component: TaskCollection,
          props: true
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
