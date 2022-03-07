import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/init';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta:
    { 
      title:'Home',
      auth: false
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/auth/Signin.vue'),
    meta:
    { 
      title:'Signin',
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/auth/Signup.vue'),
    meta:
    { 
      title:'Signup',
      auth: false
    }
  },
  {
    path: '/workouts/create',
    name: 'WorkoutsCreate',
    component: () => import(/* webpackChunkName: "workouts-create" */ '../views/workouts/Create.vue'),
    meta:
    { 
      title:'Create',
      auth:true
    }
  },
  {
    path: '/workouts/:id',
    name: 'WorkoutsShow',
    component: () => import(/* webpackChunkName: "workouts-show" */ '../views/workouts/Show.vue'),
    meta:
    { 
      title:'View Workout',
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach( (to, from, next) => 
{
  document.title = `${to.meta.title} | Active Tracker`;
  return next();
});

router.beforeEach( (to, from, next) => 
{
  const user = supabase.auth.user();
  if(to.matched.some( res => res.meta.auth) && !user) return next({name: 'Signin'})
  return next();
});

export default router
