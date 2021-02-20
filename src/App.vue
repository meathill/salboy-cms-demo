<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {User} from 'leancloud-storage';
import {MUTATIONS} from "@/store";
export default {
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
