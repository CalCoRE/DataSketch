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
      @view().addEventListener "Modal.CloseRequest", @_onCloseRequest      

    open: () =>
      @_model.open()

    close: () =>
      @_model.close()

    display: (content) =>
      @_model.display content

    _onCloseRequest: (evt) =>
      @close()            
      @view().dispatchEvent "Form.Modal.CloseRequest", {}, true  

  new Modal