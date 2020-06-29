<template>
  <div>
    <h1>Top Scores</h1>
    <b-table :items="scores" :fields="fields">
      <template v-slot:cell(#)="scores">
        {{ scores.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  created() {
    this.$store.dispatch('score/getAll');
  },
  computed: mapState({
    scores: (state) => state.score.scores,
  }),
  data: () => ({
    fields: [
      '#',
      { key: 'name', label: 'Nickname' },
      { key: 'game', label: 'Game' },
      { key: 'maxPoints', label: 'Top Score' },
      { key: 'numberOfRounds', label: 'Number of Rounds' },
    ],
  }),
  components: {
  },
};
</script>
