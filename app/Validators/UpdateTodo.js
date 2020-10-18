'use strict'

class UpdateTodo {
  get rules () {
    return {
      // validation rules
      editTodo: 'required|min:5',

    }
  }

  get messages(){
    return {
      'editTodo.required' : 'The edit todo field is required duded',
      'editTodo.min' : 'minimum edit todo field atleast 5 characters',
    }
  }
}



module.exports = UpdateTodo
