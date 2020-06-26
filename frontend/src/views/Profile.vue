<template>
  <div>
    <h1>Profile</h1>
    <b-card
      class="mb-3">
      <template v-slot:header>
        {{user.nickname}}
        <b-icon-pencil-square class="ml-2" />
      </template>
      <b-row>
        <b-col cols="4">
          <b-card-img :src="avatar" style="max-width: 200px;"/>
        </b-col>
        <b-col cols="8">
          <b-card-text>
            {{user.introduction}}
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  computed: mapState({
    user: (state) => state.auth.user,
    avatar: (state) => `${process.env.VUE_APP_API_ENDPOINT}/images/${state.auth.user.avatar}`,
  }),
};
</script>
