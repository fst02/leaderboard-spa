<template>
  <div class="w-50 mx-auto">
    <b-form @submit.prevent="register"
      @reset.prevent="reset">
      <h1>Registration</h1>
      <b-alert show variant="danger" v-if="error">{{error.message}}</b-alert>
      <b-form-group label="Nickname">
        <b-form-input type="text" v-model="user.nickname" @input="$v.user.nickname.$touch()" />
        <b-alert show variant="danger" v-if="getFieldBackendError('nickname')">
          {{getFieldBackendError('nickname').message}}
        </b-alert>
        <div v-if="$v.user.nickname.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.nickname.required">
            Name is required
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.nickname.minLength">
            Name should be at least 3 characters long
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input type="email" v-model="user.email" @input="$v.user.email.$touch()" />
        <b-alert show variant="danger" v-if="getFieldBackendError('email')">
          {{getFieldBackendError('email').message}}
        </b-alert>
        <div v-if="$v.user.email.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.email.required" >
            Email is required
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.email.email">
            Email should be valid
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input type="password" v-model="user.password" @input="$v.user.password.$touch()" />
        <b-alert show variant="danger" v-if="getFieldBackendError('password')">
          {{getFieldBackendError('password').message}}
        </b-alert>
        <div v-if="$v.user.password.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.password.required">
            Password is required
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.password.minLength">
            Password should be at least 6 characters long
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Repeat password">
        <b-form-input type="password" v-model="repeatPassword"
        @input="$v.repeatPassword.$touch()" />
        <div v-if="$v.repeatPassword.$dirty">
          <b-alert show variant="danger" v-if="!$v.repeatPassword.required">
            Repeat password is required
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.repeatPassword.sameAsPassword">
            Should be same as password
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Image upload (optional)">
        <b-form-row>
          <b-col cols="10">
            <b-form-file
              v-model="file"
              accept="image/*"
              placeholder="Choose a file"
              drop-placeholder="Drop file here..."
            />
          </b-col>
          <b-col cols="2" class="text-right">
            <b-button variant="outline-danger" @click="deleteFile()">Delete</b-button>
          </b-col>
        </b-form-row>
        <b-alert show variant="danger" v-if="getFieldBackendError('image')">
          {{getFieldBackendError('image').message}}
        </b-alert>
        <b-form-text>Maximum file size: 2 MB</b-form-text>
      </b-form-group>

      <b-form-group label="Introduction (optional)">
        <vue-editor rows="4" col="21" v-model="user.introduction" :editor-toolbar="customToolbar"/>
      </b-form-group>
      <div class="text-right">
        <b-button variant="outline-success" type="submit" class="mr-2">Register</b-button>
        <b-button variant="outline-danger" type="reset">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import {
  required,
  minLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators';
import { VueEditor } from 'vue2-editor';
import UserDto from '../dtos/UserDto';

export default {
  name: 'Registration',
  components: { VueEditor },
  data: () => ({
    user: new UserDto(),
    repeatPassword: '',
    file: null,
    error: null,
    customToolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  }),
  validations: {
    user: {
      nickname: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs(function getPassword() { return this.user.password; }),
    },
  },
  methods: {
    getFieldBackendError(field) {
      return this.error?.errors?.find((error) => error.path === field);
    },
    reset() {
      this.user = new UserDto();
      this.error = null;
      this.repeatPassword = '';
      this.file = null;
      this.$v.$reset();
    },
    deleteFile() {
      this.file = null;
      this.error = null;
    },
    async register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user', JSON.stringify(this.user));
      try {
        await axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/registration`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        this.$router.push('/signin?success=true');
      } catch (err) {
        this.error = err.response.data;
      }
    },
  },
};
</script>
