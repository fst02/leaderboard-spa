<template>
  <div>
    <h1>Top Scores</h1>
    <b-table head-variant="dark"
    table-variant="light"
    striped :items="scores"
    :fields="fields"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    responsive="sm"
    >
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
    sortBy: 'maxPoints',
    sortDesc: true,
    fields: [
      '#',
      { key: 'name', label: 'Nickname', sortable: true },
      { key: 'game', label: 'Game', sortable: true },
      { key: 'maxPoints', label: 'Top Score', sortable: true },
      { key: 'numberOfRounds', label: 'Number of Rounds', sortable: true },
    ],
  }),
  components: {
  },
};
</script>
