/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue';
import  Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions'
import mutations from './mutations'
import user from './user'

export default new Vuex.Store({
  modules:{
    mutations
  },
  actions,
  state: {
    user
  }
});
