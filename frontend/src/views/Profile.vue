<template>
  <div>
    <b-button class="text-nowrap float-right mt-2" variant="outline-dark" @click="setEditing(true)">
      <b-icon-pencil-square class="mr-2"/>
      Edit
    </b-button>
    <h1>Profile</h1>
    <b-alert show variant="danger" v-if="error">
      {{getFieldBackendError('image') || error.message}}
    </b-alert>
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

      <div v-if="isEditing">
        <b-row>
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
        </b-row>
        <b-row>
          <b-form-group label="Current password">
            <b-form-input
              type="password"
              v-model="password"
              @input="$v.password.$touch()"
            />
            <b-alert show variant="danger" v-if="getFieldBackendError('password')">
              {{getFieldBackendError('password').message}}
            </b-alert>
            <div v-if="$v.password.$dirty">
              <b-alert show variant="danger" v-if="!$v.password.required">
                Password is required
              </b-alert>
            </div>
          </b-form-group>

          <b-form-group label="New password">
            <b-form-input
              type="password"
              v-model="newPassword"
              @input="$v.newPassword.$touch()"
            />
            <b-alert show variant="danger" v-if="getFieldBackendError('password')">
              {{getFieldBackendError('password').message}}
            </b-alert>
            <div v-if="$v.newPassword.$dirty">
              <b-alert show variant="danger" v-if="!$v.newPassword.minLength">
                New password should be at least 6 characters long
              </b-alert>
            </div>
          </b-form-group>

          <b-form-group label="Repeat new password">
            <b-form-input type="password" v-model="repeatPassword"
              @input="$v.repeatPassword.$touch()" />
            <div v-if="$v.repeatPassword.$dirty">
              <b-alert show variant="danger" v-if="!$v.repeatPassword.requiredIf">
                Repeat new password is required
              </b-alert>
              <b-alert show variant="danger" v-if="!$v.repeatPassword.sameAsPassword">
                Should be same as new password
              </b-alert>
            </div>
          </b-form-group>
        </b-row>
        <b-row align-h="end">
          <b-button variant="outline-success" type="submit" @click="sendChanges()" class="mr-2">
            Save
          </b-button>
          <b-button variant="outline-danger" @click="setEditing(false)">Cancel</b-button>
        </b-row>
      </div>

    </b-card>
    <UserScoresComponent />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';
import {
  required,
  minLength,
  sameAs,
  requiredIf,
} from 'vuelidate/lib/validators';
import UserScoresComponent from '../components/UserScoresComponent.vue';

export default {
  name: 'Profile',
  data: () => ({
    isEditing: false,
    file: null,
    error: null,
    password: '',
    newPassword: '',
    repeatPassword: '',
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
  validations: {
    password: {
      required,
    },
    newPassword: {
      minLength: minLength(6),
    },
    repeatPassword: {
      requiredIf: requiredIf(function hasNewPassword() { return this.$v.newPassword.$dirty; }),
      sameAsPassword: sameAs(function getPassword() { return this.newPassword; }),
    },
  },
  methods: {
    getFieldBackendError(field) {
      const err = this.error?.errors?.find((error) => error.path === field);
      if (err) {
        return err.message;
      }
      return null;
    },
    setEditing(status) {
      this.isEditing = status;
      this.file = null;
      this.password = '';
      this.newPassword = '';
      this.repeatPassword = '';
      this.$v.$reset();
    },
    async sendChanges() {
      this.isEditing = false;
      const formData = new FormData();
      this.user.password = this.password;
      this.user.newPassword = this.newPassword;
      formData.append('file', this.file);
      formData.append('user', JSON.stringify(this.user));
      await this.$store.dispatch('profile/update', formData);
      if (this.$store.state.profile.error) {
        this.error = this.$store.state.profile.error;
        this.file = null;
        this.password = null;
      }
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
