define (require) ->
  Action = require 'modules/action/action'

  #Action for manage stamping effect.
  class StampingEffectAction extends Action
    constructor: (@canvas, @_objects,@_isStamping) ->

    #Method for enable and disable the stamping effect
    execute: () =>
      @_objects._model._data.isStamping = $('#isStamp')[0].checked