<template>
  <div>
    <b-alert show variant="success" class="mt-3 text-center" v-if="justVerified">
      Welcome @{{nickname}}, you have successfully verified your email address.
    </b-alert>
    <b-alert show variant="success" class="mt-3 text-center" v-if="justRegistered">
      Successfully registered. Please check your email to verify.
    </b-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SignIn',
  computed: mapState({
    nickname: (state) => state.auth.user.nickname,
  }),
  data: () => ({
    justVerified: false,
    justRegistered: false,
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/registration/verify') {
        vm.justVerified = true; //eslint-disable-line
      }
      if (from.path === '/registration' && to.query.success) {
        vm.justRegistered = true; //eslint-disable-line
      }
    });
    next();
  },
};
</script>
