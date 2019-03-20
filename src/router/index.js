import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import PeopleList from '@/components/PeopleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/allpersons',
      name: 'PeopleList',
      component: PeopleList
    }
  ]
})
