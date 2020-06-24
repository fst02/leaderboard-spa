<template>
  <b-form @submit.prevent="register" @reset.prevent="reset">
    <h1>Registration</h1>
    <b-form-group label="Name">
      <b-form-input type="text" v-model="user.nickname" @input="$v.user.nickname.$touch()" />
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
      <b-form-input type="password" v-model="repeatPassword" @input="$v.repeatPassword.$touch()" />
      <div v-if="$v.repeatPassword.$dirty">
        <b-alert show variant="danger" v-if="!$v.repeatPassword.required">
          Repeat password is required
        </b-alert>
        <b-alert show variant="danger" v-if="!$v.repeatPassword.sameAsPassword">
          Should be same as password
        </b-alert>
      </div>
    </b-form-group>

    <b-form-group label="Image upload">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      />
    </b-form-group>

    <b-form-group label="Introduction">
      <b-form-textarea rows="4" col="21" v-model="user.introduction"/>
    </b-form-group>

    <b-button variant="success" type="submit">Register</b-button>
    <b-button variant="danger" type="reset">Reset</b-button>
  </b-form>
</template>

<script>
import axios from 'axios';
import {
  required,
  minLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators';
import UserDto from '../dtos/UserDto';

export default {
  name: 'Registration',
  data: () => ({
    user: new UserDto(),
    repeatPassword: '',
    file: null,
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
          'http://fullstack.braininghub.com:4040/registration',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
