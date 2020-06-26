<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand to="/">Leaderboard</b-navbar-brand>
    <b-navbar-toggle target="navbar-toggle-collapse">
      <template v-slot:default="{ expanded }">
        <b-icon icon="collection-fill" v-if="expanded"></b-icon>
        <b-icon icon="collection" v-else ></b-icon>
      </template>
    </b-navbar-toggle>
    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Top Scores</b-nav-item>
        <b-nav-item v-if="!user" to="/registration">Sign Up</b-nav-item>
        <b-nav-item v-if="!user" to="/signin">Sign In</b-nav-item>
        <b-nav-item v-if="user" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="user" @click="logout()">Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationComponent',
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
button:focus {
  outline: 0;
}
</style>
