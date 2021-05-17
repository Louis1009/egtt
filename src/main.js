// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import  Resource  from 'vue-resource'
import  Jsonp  from  'vue-jsonp'
import Socketio from 'vue-socket.io'
// 全局导入组件
import {
  XHeader,
  XInput,
  Group,
  XButton,
  Tabbar,
  TabbarItem,
  Tab,
  TabItem,
  ViewBox
} from 'vux'

Vue.component('view-box', ViewBox);
Vue.component('x-header', XHeader);
Vue.component('x-input', XInput);
Vue.component('group', Group);
Vue.component('x-button', XButton);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);

Vue.config.productionTip = false
Vue.prototype.axios = axios

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach(function (to, from, next) {

  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  next()
});

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
Vue.use(Resource)
Vue.use(Jsonp)
/*Vue.use(new Socketio({
  debug: false,
  connection: 'http://47.75.63.240:8070'
}));*/

