define (require) ->
  $ = require 'jquery'
  Action = require 'modules/action/action'

  class DuplicateObjectsAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      Promise.all (obj.clone() for obj in @_objects)
        .then (clones) =>
          @_clones = clones
          for clone in clones when clone?.get('view')?
            clone.get('view').set 'top', $(window).height() / 2
            clone.get('view').set 'left', $(window).width() / 2
            @canvas.addObject clone
          # @canvas.addObjects clones

    undo: () =>
      @canvas.removeObjects @_clones
