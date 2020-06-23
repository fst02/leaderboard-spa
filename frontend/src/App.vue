<template>
  <div id="app">
    <div id="nav">
      <NavigationComponent />
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavigationComponent from './components/NavigationComponent.vue';

export default {
  name: 'App',
  components: {
    NavigationComponent,
  },
};
</script>
