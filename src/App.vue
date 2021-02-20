<template lang="pug">
#app
  nav#nav.navbar.navbar-expand-md.navbar-dark.bg-dark
    router-link.navbar-brand(:to="{name: 'home'}") Salboy

    .collapse.navbar-collapse
      ul.navbar-nav
        li.nav-item
          router-link.nav-link(:to="{name: 'about'}") 关于
        li.nav-item
          router-link.nav-link(:to="{name: 'page.new'}") 新建页面

      .navbar-text.ml-auto {{user}}

  router-view
</template>

<script>
import {User} from 'leancloud-storage';
import {mapState} from 'vuex';
import {MUTATIONS} from "@/store";
export default {
  computed: {
    ...mapState({
      user(state) {
        if (!state.currentUser) {
          return '';
        }

        return state.currentUser.get('username');
      },
    }),
  },

  beforeMount() {
    const user = User.current();
    if (user) {
      this.$store.commit(MUTATIONS.SET_CURRENT_USER, user);
      if (this.$route.name.startsWith('user.')) {
        this.$router.replace({name: 'home'});
      }
    } else {
      const {name, params} = this.$route;
      this.$store.commit(MUTATIONS.SET_ACCESS_FROM, {name, params});
      this.$router.replace({name: 'user.login'});
    }
  },
}
</script>
