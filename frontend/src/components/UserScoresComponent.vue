<template>
  <b-table head-variant="dark"
    table-variant="light"
    striped :items="scores"
    :fields="fields"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    responsive="sm"
    id="scoreboard"
  >
    <template v-slot:cell(#)="scores">
      {{ scores.index + 1 }}
    </template>
  </b-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserScoresComponent',
  data: () => ({
    fields: [
      '#',
      { key: 'name', label: 'Nickname', sortable: true },
      { key: 'game', label: 'Game', sortable: true },
      { key: 'maxPoints', label: 'Top Score', sortable: true },
      { key: 'numberOfRounds', label: 'Number of Rounds', sortable: true },
    ],
    sortBy: 'maxPoints',
    sortDesc: true,
  }),
  computed: mapState({
    scores(state) {
      return state.score.scores.filter((row) => row.name === state.auth.user.nickname);
    },
  }),
};
</script>
