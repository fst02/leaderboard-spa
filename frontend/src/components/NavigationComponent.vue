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
        <b-nav-item to="/">TopScores</b-nav-item>
        <b-nav-item to="/registration">Sign Up</b-nav-item>
        <b-nav-item to="/signin">Sign In</b-nav-item>
        <b-nav-item to="/about">Profile</b-nav-item>
        <b-nav-item>Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationComponent',
};
</script>

<style scoped>
button:focus {
  outline: 0;
}
</style>
