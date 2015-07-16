define (require) ->
  Action = require 'modules/action/action'

  class GroupAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>

    undo: () =>
