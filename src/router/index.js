import Vue from 'vue'
import Router from 'vue-router'

import Cart from "../views/cart/Cart";
import Category from "../views/category/Category";
import Home from "../views/home/Home";
import Profile from "../views/profile/Profile";
import Detail from "@/views/detail/Detail";

Vue.use(Router)

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:id",
    component: Detail
  },
]

const router = new Router({
  routes,
  mode: "history"
})

export default router
