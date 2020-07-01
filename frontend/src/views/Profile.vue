<template>
  <div>
    <b-button class="text-nowrap float-right mt-2" variant="outline-dark" @click="setEditing(true)">
      <b-icon-pencil-square class="mr-2"/>
      Edit
    </b-button>
    <h1>Profile</h1>
    <b-card class="mb-3">
      <template v-slot:header>
        <b-icon-person-bounding-box class="mr-2" />
        {{user.nickname}}<br>
        <b-icon-envelope class="mr-2" />
        {{user.email}}
      </template>
      <b-row v-if="!isEditing">
        <b-col cols="4">
          <b-card-img :src="avatar" style="max-width: 200px;"/>
        </b-col>
        <b-col cols="8">
          <b-card-text v-html="user.introduction" />
        </b-col>
      </b-row>

      <b-row v-if="isEditing">
        <b-col cols="4">
          <b-form-group label="Image upload">
            <b-form-file
              v-model="file"
              accept="image/*"
              placeholder="Choose a file"
              drop-placeholder="Drop file here..."
            />
            <b-form-text>Maximum file size: 2 MB</b-form-text>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group label="Introduction">
            <vue-editor
              rows="4"
              col="21"
              v-model="user.introduction"
              :editor-toolbar="customToolbar"
            />
          </b-form-group>
        </b-col>
        <div class="text-right">
          <b-button variant="outline-success" type="submit" @click="sendChanges()" class="mr-2">
            Save
          </b-button>
          <b-button variant="outline-danger" @click="setEditing(false)">Cancel</b-button>
        </div>
      </b-row>

    </b-card>
    <UserScoresComponent />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';
import UserScoresComponent from '../components/UserScoresComponent.vue';

export default {
  name: 'Profile',
  data: () => ({
    isEditing: false,
    file: null,
    error: null,
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  }),
  computed: mapState({
    user: (state) => state.profile.user,
    avatar: (state) => {
      if (state.profile.user.avatar) {
        return `${process.env.VUE_APP_API_ENDPOINT}/images/${state.profile.user.avatar}`;
      }
      return '/default.jpg';
    },
  }),
  components: {
    UserScoresComponent,
    VueEditor,
  },
  methods: {
    setEditing(status) {
      this.isEditing = status;
    },
    sendChanges() {
      this.isEditing = false;
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user', JSON.stringify(this.user));
      this.$store.dispatch('profile/update', formData);
    },
  },
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
