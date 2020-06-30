<template>
  <div>
    <h1>Top Scores</h1>
    <b-form-select v-model="selectedGame" :options="options" class="w-25 mb-2"/>
    <b-table head-variant="dark"
      table-variant="light"
      striped :items="scores"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
      id="scoreboard"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template v-slot:cell(#)="scores">
        {{ (currentPage - 1) * perPage + (scores.index + 1) }}
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="scores.length"
      :per-page="perPage"
      aria-controls="scoreboard"
      align="right"
    ></b-pagination>
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
    scores(state) {
      return state.score.scores.filter((row) => {
        if (this.selectedGame) {
          return row.game === this.selectedGame;
        }
        return true;
      });
    },
  }),
  data: () => ({
    sortBy: 'maxPoints',
    sortDesc: true,
    perPage: 5,
    currentPage: 1,
    fields: [
      '#',
      { key: 'name', label: 'Nickname', sortable: true },
      { key: 'game', label: 'Game', sortable: true },
      { key: 'maxPoints', label: 'Top Score', sortable: true },
      { key: 'numberOfRounds', label: 'Number of Rounds', sortable: true },
    ],
    selectedGame: '',
    options: [
      { value: '', text: 'All' },
      { value: 'Hangman', text: 'Hangman' },
      { value: 'Tetris', text: 'Tetris' },
      { value: 'Mario', text: 'Mario' },
    ],
  }),
  components: {
  },
};
</script>

<style>
.page-item.active .page-link {
  background-color: var(--dark) !important;
  border-color: var(--dark) !important;
  color: white !important;
}
.page-link {
  color: var(--dark) !important;
}
</style>
