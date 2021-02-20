import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const MUTATIONS = {
  SET_NATIONS: 'setNations',
  SET_CITY: 'setCity',
  SET_CURRENT_USER: 'setCurrentUser',
  SET_ACCESS_FROM: 'setAccessFrom',
};

export default new Vuex.Store({
  state: {
    currentUser: null,
    accessFrom: null,
    nations: [
      {
        title: '泰国',
        description: '国家一',
      },
      {
        title: '越南',
        description: '国家二',
      },
      {
        title: '马拉西亚',
        description: '国家三',
      },
    ],
    city: [
      {
        title: '曼谷',
        description: '城市一',
      },
      {
        title: '胡志明市',
        description: '城市二',
      },
      {
        title: '吉隆坡',
        description: '城市三',
      },
    ],
  },
  mutations: {
    [MUTATIONS.SET_CURRENT_USER](state, user) {
      state.currentUser = user;
    },
    [MUTATIONS.SET_ACCESS_FROM](state, from) {
      state.accessFrom = from;
    },
    [MUTATIONS.SET_NATIONS](state, nation) {
      const {title, description} = nation;
      const old = state.nations.find(({title: oTitle}) => oTitle === title);
      if (old) {
        old.description = description;
      } else {
        state.nations.push(nation);
      }
    },
    [MUTATIONS.SET_CITY](state, city) {
      state.city = city;
    },
  },
  actions: {
  },
  modules: {
  }
})
