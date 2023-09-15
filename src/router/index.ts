import { createRouter, createWebHistory } from 'vue-router'
import EvnetListView from '../views/EvnetListView.vue'
import AboutView from '../views/AboutView.vue'
import EventView from '../views/EventView.vue'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EvnetListView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component:

      component: AboutView
    },
    {
      path: '/event/:id',
      name: 'event',
      props: true,
      component: EventView
    },
		{
			path: '/todos',
			name: 'todo',
			component: TodoView
		}

  ]
})

export default router
