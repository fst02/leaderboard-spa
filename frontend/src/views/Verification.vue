<template>
  <div>
    <b-alert class="mt-3 text-center" show variant="success" v-if="!error">
      Verification in progress, please wait
    </b-alert>
    <b-alert class="mt-3 text-center" show variant="danger" v-if="error">{{error.message}}</b-alert>
  </div>
</template>

<script>
export default {
  name: 'Verification',
  data: () => ({
    error: null,
  }),
  created() {
    this.verify();
  },
  methods: {
    async verify() {
      const { token } = this.$route.query;
      await this.$store.dispatch('auth/verify', token);
      if (this.$store.state.auth.error) {
        this.error = this.$store.state.auth.error;
      } else {
        this.$router.push('/signin');
      }
    },
  },
};
</script>
