<template>
  <div>
    <h1>Profile</h1>
    <b-card
      class="mb-3">
      <template v-slot:header>
        <b-icon-pencil-square class="mr-2" />
        {{user.nickname}} <br>
        <b-icon-envelope class="mr-2" />
        {{user.email}}
      </template>
      <b-row>
        <b-col cols="4">
          <b-card-img :src="avatar" style="max-width: 200px;"/>
        </b-col>
        <b-col cols="8">
          <b-card-text v-html="user.introduction">
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
    avatar: (state) => {
      if (state.auth.user.avatar) {
        return `${process.env.VUE_APP_API_ENDPOINT}/images/${state.auth.user.avatar}`;
      }
      return '../assets/2.jpeg';
    },
  }),
};
</script>

<style lang="css">
.ql-align-right {
  text-align: right;
}
.ql-align-center {
  text-align: center;
}
.ql-align-justify {
  text-align: justify;
}
</style>
