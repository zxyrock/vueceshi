import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import('@/views/home/home');
const Category = () => import('@/views/category/category');
const Cart = () => import('@/views/cart/cart');
const Profile = () => import('@/views/profile/profile');

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
