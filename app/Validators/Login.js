'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email',
      username: 'required|min:5',

    }
  }

  get messages () {
    return {
      'email.required': 'The email field is required',
      'email.email': 'Enter a valid email address',

      'password.required': 'The password field is required',
      'password.min': 'The password field must be at least 5 characters',
      //'password.confirmed': 'The password fields do not match',
    }
  }
}

module.exports = Register