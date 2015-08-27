define (require) ->
  $ = require 'jquery'
  Action = require 'modules/action/action'

  class DuplicateObjectsAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      Promise.all (obj.clone() for obj in @_objects)
        .then (clones) =>
          @_clones = clones
          for clone in clones
            clone.setPosition
              x: $(window).width() / 2
              y: $(window).height() / 2
            @canvas.addObject clone
          @canvas.render()

    undo: () =>
      @canvas.removeObjects @_clones
