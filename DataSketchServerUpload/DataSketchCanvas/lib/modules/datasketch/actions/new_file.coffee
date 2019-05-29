define (require) ->
  Action = require 'modules/action/action'

  #Action for clearing canvas and create a new file for user.
  class NewFile extends Action

    #Method for clearing canvas and create a new file on canvas.
    constructor: (@canvas) ->
           @canvas.createNewFile()