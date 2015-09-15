define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'

  class Modal extends Controller
    constructor: () ->
      super
        modelClass: Model
        viewClass: View
        modelData: {}

    open: () =>
      @_model.open()

    close: () =>
      @_model.close()

    display: (content) =>
      @_model.display content

  new Modal