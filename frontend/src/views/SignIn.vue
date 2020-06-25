<template>
  <div>
    <b-alert show variant="success" class="mt-3" v-if="justVerified">
      Successfully verified your email address
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    justVerified: false,
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/registration/verify') {
        vm.justVerified = true; //eslint-disable-line
      }
    });
    next();
  },
};
</script>
