<template>
  <div>
    <b-alert show variant="success" class="mt-3" v-if="justVerified">
      Successfully verified your email address
    </b-alert>
    <b-alert show variant="success" class="mt-3" v-if="justRegistered">
      Successfully registered. Please check your email to verify
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    justVerified: false,
    justRegistered: false,
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/registration/verify') {
        vm.justVerified = true; //eslint-disable-line
      }
      if (from.path === '/registration') {
        vm.justRegistered = true; //eslint-disable-line
      }
    });
    next();
  },
};
</script>
