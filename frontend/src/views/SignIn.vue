<template>
  <div class="w-50 mx-auto">
    <b-alert show variant="success" class="mt-3 text-center" v-if="justVerified">
      Welcome @{{nickname}}, you have successfully verified your email address.
    </b-alert>
    <b-alert show variant="success" class="mt-3 text-center" v-if="justRegistered">
      Successfully registered. Please check your email to verify.
    </b-alert>
    <b-form @submit.prevent="login"
      @reset.prevent="reset">
      <h1>Sign In</h1>
      <b-alert show variant="danger" v-if="error">{{error.error}}</b-alert>
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
        </div>
      </b-form-group>
      <div class="text-right">
        <b-button variant="outline-success" type="submit" class="mr-2">Sign in</b-button>
        <b-button variant="outline-danger" type="reset">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
import UserDto from '../dtos/UserDto';

export default {
  name: 'SignIn',
  computed: mapState({
    nickname: (state) => state.auth.user.nickname,
  }),
  data: () => ({
    user: new UserDto(),
    justVerified: false,
    justRegistered: false,
    error: null,
  }),
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      await this.$store.dispatch('auth/login', this.user);
      if (this.$store.state.auth.user) {
        this.$router.push('/');
      } else {
        this.error = this.$store.state.auth.error;
      }
    },
    reset() {
      this.user = new UserDto();
      this.error = null;
      this.$v.$reset();
    },
  },
  validations: {
    user: {
      email: { required, email },
      password: { required },
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/registration/verify') {
        vm.justVerified = true; //eslint-disable-line
      }
      if (from.path === '/registration' && to.query.success) {
        vm.justRegistered = true; //eslint-disable-line
      }
    });
    next();
  },
};
</script>
