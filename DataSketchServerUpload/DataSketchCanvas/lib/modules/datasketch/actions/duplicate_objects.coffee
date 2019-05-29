define (require) ->
  $ = require 'jquery'
  Action = require 'modules/action/action'

  #Action for making duplicate object or group on canvas.
  class DuplicateObjectsAction extends Action
    constructor: (@canvas, @_objects) ->

    #Method for making duplicate object or group on canvas.
    execute: () =>
      Promise.all (obj.clone(@_objects["0"]._view._fabric.type) for obj in @_objects)
        .then (clones) =>
          @_clones = clones
          for clone in clones
            clone._view._fabric.id = clone._model._data.id
            clone.setPosition
              x: $(window).width() / 2
              y: $(window).height() / 2
            @canvas.addObject clone
          @canvas.render()

    #Method for undo the operation of duplicating object on canvas.
    undo: () =>
      Promise.resolve (() =>
        @canvas.removeObjects @_clones
      )()
