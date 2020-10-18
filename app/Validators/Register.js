'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email|unique:users',
      username: 'required|min:5',
      password: 'required|min:5',
    }
  }

  get messages () {
    return {
      'email.required': 'The email field is required',
      'email.email': 'Enter a valid email address',
      'email.unique': 'Email already exists',

      'username.required': 'The username field is required',
      'username.min': 'The username field must be at least 5 characters',


      'password.required': 'The password field is required',
      'password.min': 'The password field must be at least 5 characters',
      //'password.confirmed': 'The password fields do not match',
    }
  }
}

module.exports = Register