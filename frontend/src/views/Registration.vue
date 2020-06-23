<template>
  <b-form @submit.prevent="register" @reset.prevent="reset">
    <h1>Registration</h1>
    <b-form-group label="Name">
      <b-form-input type="text"/>
      <b-alert show variant="danger">
        Name is required
      </b-alert>
      <b-alert show variant="danger">
        Name should be at least 3 characters long
      </b-alert>
    </b-form-group>

    <b-form-group label="Email">
      <b-form-input type="email"/>
      <b-alert show variant="danger">
        Email is required
      </b-alert>
      <b-alert show variant="danger">
        Email should be valid
      </b-alert>
    </b-form-group>

    <b-form-group label="Password">
      <b-form-input type="password"/>
      <b-alert show variant="danger">
        Password is required
      </b-alert>
      <b-alert show variant="danger">
        Password should be at least 6 characters long
      </b-alert>
    </b-form-group>

    <b-form-group label="Repeat password">
      <b-form-input type="password" />
      <b-alert show variant="danger">
        Repeat password is required
      </b-alert>
      <b-alert show variant="danger">
        Should be same as password
      </b-alert>
    </b-form-group>

    <b-form-group label="Introduction">
      <b-form-textarea rows="4" col="21"/>
    </b-form-group>

    <b-button variant="success" type="submit">Register</b-button>
    <b-button variant="danger" type="reset">Reset</b-button>
  </b-form>
</template>

<script>
import UserDto from '../dtos/UserDto';

export default {
  name: 'Registration',
  data: () => ({
    user: new UserDto(),
  }),
};
</script>
