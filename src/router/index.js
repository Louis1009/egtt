import Vue from 'vue'
import Router from 'vue-router'

//region 解决vue中的NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//endregion

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/egtt'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/Register/Register")
    },
    {
      path: '/egtt',
      name: 'egtt',
      component: () => import("@/views/Egtt/Egtt")
    },
    {
      path: '/frame/',
      name: 'frame',
      component: () => import("@/views/Frame/Frame"),
      children: [
        {
          path: 'Index',
          name: 'Index',
          component: () => import('@/views/Index/Index')
        },
      ]
    },
    {
      path: '/ForgetPassword',
      name: 'forgetPassword',
      component: () => import("@/views/Login/ForgetPassword")
    },
    {
      path: '/member',
      name: 'Member',
      component: () => import("@/views/Index/Member")
    },
    {
      path: '/trading',
      name: 'Trading',
      component: () => import("@/views/Index/Trading")
    },
    {
      path: '/consulting',
      name: 'Consulting',
      component: () => import("@/views/Index/Consulting")
    },
    {
      path: '/member-atm',
      name: 'Member-atm',
      component: () => import("@/views/Index/Member/Member-atm")
    },
    {
      path: '/member-index',
      name: 'Member-index',
      component: () => import("@/views/Index/Member/Member-index")
    },
    {
      path: '/member-info',
      name: 'Member-info',
      component: () => import("@/views/Index/Member/Member-info")
    },
    {
      path: '/member-message',
      name: 'Member-message',
      component: () => import("@/views/Index/Member/Member-message")
    },
    {
      path: '/member-recharge',
      name: 'Member-recharge',
      component: () => import("@/views/Index/Member/Member-recharge")
    },
    {
      path: '/member-setting',
      name: 'Member-setting',
      component: () => import("@/views/Index/Member/Member-setting")
    },
    {
      path: '/member-transaction',
      name: 'Member-transaction',
      component: () => import("@/views/Index/Member/Member-transaction")
    },
    {
      path: '/member-fund',
      name: 'Member-fund',
      component: () => import("@/views/Index/Member/Member-fund")
    }
    ,
    {
      path: '/recharge-qrcode',
      name: 'Recharge-qrcode',
      component: () => import("@/views/Index/Member/Recharge/Recharge-qrcode")
    },
    {
      path: '/consulting-transactionDetail',
      name: 'Consulting-transactionDetail',
      component: () => import("@/views/Index/Member/Consulting/Consulting-transactionDetail")
    },
    {
      path: '/info-password',
      name: 'Info-password',
      component: () => import("@/views/Index/Member/Info/Info-password")
    },
    {
      path: '/frame-index',
      name: 'Frame-index',
      component: () => import("@/views/Frame/quote-index/Frame-index")
    },
    {
      path: '/frame-order',
      name: 'Frame-order',
      component: () => import("@/views/Frame/quote-index/Frame-order")
    },
    {
      path: '/frame-position',
      name: 'Frame-position',
      component: () => import("@/views/Frame/quote-index/Frame-position")
    }
  ]
})
