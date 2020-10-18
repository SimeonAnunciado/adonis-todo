'use strict'

class StoreTodo {
  get rules () {
    return {
      // validation rules
      addTodo: 'required|min:5',

    }
  }

  get messages(){
    return {
      'addTodo.required' : 'The add todo field is required duded',
      'addTodo.min' : 'minimum add todo field atleast 5 characters',
    }
  }
}



module.exports = StoreTodo
