<template lang="pug">
.user.user-login
  form.w-50.p-5.mx-auto(@submit.prevent="doLogin")
    .form-group
      label.sr-only(for="input-email") 邮箱
      input#input-email.form-control(
        type="email",
        v-model.trim="formData.email",
        placeholder="邮箱",
        required,
        autofocus,
      )
    .form-group
      label.sr-only(for="password") 密码
      input#password.form-control(
        type="password",
        v-model.trim="formData.password",
        placeholder="密码",
        required,
      )

    .alert.alert-danger(
      v-if="message",
    ) {{message}}

    button.btn.btn-lg.btn-primary.btn-block(
      :disabled="isSubmitting || logged",
    )
      i.spinner-border.spinner-border-sm(v-if="isSubmitting")
      template(v-else) 登录

</template>

<script>
import {mapState} from 'vuex';
import {User} from 'leancloud-storage';
import {MUTATIONS} from "@/store";

export default {
  computed: {
    ...mapState(['accessFrom']),
  },

  data() {
    return {
      isSubmitting: false,
      logged: false,
      message: null,

      formData: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    async doLogin() {
      this.isSubmitting = true;
      try {
        const user = await User.loginWithEmail(this.formData.email, this.formData.password);
        this.logged = true;
        this.$store.commit(MUTATIONS.SET_CURRENT_USER, user);
        this.doLeave();
      } catch (error) {
        this.message = error.message || error;
      }
      this.isSubmitting = false;
    },

    doLeave() {
      if (this.accessFrom) {
        this.$router.replace(this.accessFrom);
        this.$store.commit(MUTATIONS.SET_ACCESS_FROM, null);
      } else if (this.$route.name === 'user.login') {
        this.$router.replace({name: 'home'});
      }
    },
  }
}
</script>
