define (require) ->
  Action = require 'modules/action/action'

  class FormAction extends Action
    constructor: () ->
      super()

    getButton: () =>