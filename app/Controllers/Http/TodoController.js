'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use('App/Models/Todo')
const { validate } = use('Validator')


/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

 

  async index ({ request, response, view ,auth}) {
    //const todos = await Todo.all()

    const todos = await Todo
    .query()
    .where('user_id' , auth.user.id)
    .fetch()

    return view.render('index', {
      todos : todos.toJSON(),
      name : auth.user.username
    })
  }

  /**
   * Render a form to be used for creating a new todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    
 


  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , session, auth }) {

   
    // const todo = await Todo.create({
    //   title : request.input('addTodo')
    // })

    const todo = new Todo()
    todo.user_id = auth.user.id,
    todo.title = request.input('addTodo')

    await todo.save()

    session.flash({ successMessage : 'Todo was added!'})
    return response.redirect('back')
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing todo.
   * GET todos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view , auth}) {
    const todo = await Todo.findOrFail(params.id)

    if(auth.user.id !== todo.id){
        return 'you do not have permission on this post'
    }

    
    
    return view.render('edit',{
      todo : todo.toJSON()
    })
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response ,session, auth}) {
    const todo = await Todo.findOrFail(params.id)

    if(auth.user.id !== todo.id){
      return 'you do not have permission on this post'
  }


    todo.title = request.input('editTodo')
    todo.completed = request.input('completedCheck') == "on" ? true : false
    await todo.save()

    session.flash({ successMessage : 'Todo was updated Successfully!'})
    return response.route('todos.index')
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response ,session ,auth}) {
    const todo = await Todo.findOrFail(params.id)

    if(auth.user.id !== todo.id){
      return 'you do not have permission on this post'
    }


    await todo.delete()
    session.flash({ successMessage : 'Todo was deleted Successfully!'})
    return response.redirect('back')
  }
}


module.exports = TodoController
