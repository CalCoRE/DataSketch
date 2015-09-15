define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'

  class Form extends Controller
    constructor: (settings) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View
      super settings

      @view().addEventListener "*", @_onEvent

    _onEvent: (evt) =>
      if evt.name.match /^Form\./
        @bubbleEvent evt

    value: () =>
      @_model.getValue()

  Form.create = (data) ->
    new Form
      modelData: data

  Form