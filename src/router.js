import Vue from 'vue'
import Router from 'vue-router'
import app from '@/views/app/_template'
import {noAuth} from '@/config/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: app,
      meta: {auth: true},
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
        },
        {
          path: 'leads',
          component: () => import(/* webpackChunkName: "leads" */ '@/views/app/leads/leads'),
          name: 'leads'
        },
        {
          path: 'leads/:id',
          component: () => import(/* webpackChunkName: "show-lead" */ '@/views/app/leads/show_lead'),
          name: 'leads-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: 'applications/:id',
          component: () => import(/* webpackChunkName: "show-application" */ '@/views/app/deals/show_deal'),
          name: 'applications-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: 'applications',
          component: () => import(/* webpackChunkName: "applications" */ '@/views/app/deals/deals'),
          name: 'applications'
        },
        {
          path: '/CRM/brokers',
          component: () => import(/* webpackChunkName: "brokers" */ '@/views/app/CRM/brokers/brokers'),
          name: 'brokers'
        },
        {
          path: 'CRM/brokers/:id',
          component: () => import(/* webpackChunkName: "show-broker" */ '@/views/app/CRM/brokers/show_broker'),
          name: 'brokers-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: '/CRM/users',
          component: () => import(/* webpackChunkName: "users" */ '@/views/app/CRM/users/users'),
          name: 'users'
        },
        {
          path: 'CRM/users/:id',
          component: () => import(/* webpackChunkName: "show-user" */ '@/views/app/CRM/users/show_user'),
          name: 'users-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: '/CRM/businesses',
          component: () => import(/* webpackChunkName: "businesses" */ '@/views/app/CRM/business/businesses'),
          name: 'businesses'
        },
        {
          path: '/CRM/businesses/:id',
          component: () => import(/* webpackChunkName: "show-business" */ '@/views/app/CRM/business/show_business'),
          name: 'businesses-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: '/CRM/contacts',
          component: () => import(/* webpackChunkName: "contacts" */ '@/views/app/CRM/contacts/contacts'),
          name: 'contacts'
        },
        {
          path: '/CRM/contacts/:id',
          component: () => import(/* webpackChunkName: "show-contacts" */ '@/views/app/CRM/contacts/show_contact'),
          name: 'contacts-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: '/CRM/lenders',
          component: () => import(/* webpackChunkName: "lenders" */ '@/views/app/CRM/lenders/lenders'),
          name: 'lenders'
        },
        {
          path: '/CRM/lenders/:id',
          component: () => import(/* webpackChunkName: "show-lender" */ '@/views/app/CRM/lenders/show_lender'),
          name: 'lenders-id',
          props: (route) => ({id: route.params.id})
        },
        {
          path: '/marketing/affiliate_networks',
          component: () => import(/* webpackChunkName: "affiliates" */ '@/views/app/marketing/affiliate_networks/affiliate_newtworks'),
          name: 'affiliate_networks '
        },
        {
          path: '/settings/products',
          component: () => import(/* webpackChunkName: "products" */ '@/views/app/settings/products'),
          name: 'products'
        },
        {
          path: 'houses',
          component: () => import(/* webpackChunkName: "contacts" */ '@/views/app/CRM/contacts/contacts'),
          name: 'houses'
        }
      ]
    }, {
      path: '/auth',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/app'),
      beforeEnter: noAuth,
      children: [
        {
          path: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login'),
          name: 'login'
        },
        {
          path: 'email',
          component: () => import(/* webpackChunkName: "email" */ '@/views/auth/email'),
          name: 'email'
        },
        {
          path: 'reset',
          component: () => import(/* webpackChunkName: "reset" */ '@/views/auth/reset'),
          name: 'reset'
        }
      ]
    }
  ]
})
