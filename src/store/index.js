import Vue from 'vue'
import Vuex from 'vuex'
import {Query} from "leancloud-storage";
import {CITY_TABLE, NATIONS_TABLE} from "@/data/constant";

Vue.use(Vuex)

export const MUTATIONS = {
  SET_NATIONS: 'setNations',
  SET_CITY: 'setCity',
  SET_CURRENT_USER: 'setCurrentUser',
  SET_ACCESS_FROM: 'setAccessFrom',
};

export const ACTIONS = {
  GET_NATIONS: 'getNations',
  GET_CITY: 'getCity',
};

const loaders = {};
function createAction(key, table) {
  return function({state, commit}, {force = false} = {}) {
    if (loaders[key]) {
      return loaders[key];
    }
    if (!force && state[key]) {
      return Promise.resolve(state[key]);
    }
    const query = new Query(table);
    loaders[key] = query.find()
      .then(items => {
        items = items.map(item => {
          return {
            title: item.get('title'),
            article: item.get('article'),
          };
        });
        commit(`set${key}`, items);
        loaders[key] = null;
        return items;
      });
    return loaders[key];
  };
}

export default new Vuex.Store({
  state: {
    currentUser: null,
    accessFrom: null,
    nations: [],
    city: [],
  },
  mutations: {
    [MUTATIONS.SET_CURRENT_USER](state, user) {
      state.currentUser = user;
    },
    [MUTATIONS.SET_ACCESS_FROM](state, from) {
      state.accessFrom = from;
    },
    [MUTATIONS.SET_NATIONS](state, nation) {
      const {title, article} = nation;
      const old = state.nations.find(({title: oTitle}) => oTitle === title);
      if (old) {
        old.article = article;
      } else {
        state.nations.push(...nation);
      }
    },
    [MUTATIONS.SET_CITY](state, city) {
      state.city = city;
    },
  },
  actions: {
    [ACTIONS.GET_NATIONS]: createAction('Nations', NATIONS_TABLE),
    [ACTIONS.GET_CITY]: createAction('City', CITY_TABLE),
  },
  modules: {
  }
})
