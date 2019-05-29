define (require) ->
  Action = require 'modules/action/action'

  #Action for management of save and load mechanism.
  class LoadSaveAction extends Action
    constructor: (@canvas, @_Action) ->

    #Method for enable or disable load and save modal.
    execute: () =>
      Promise.resolve (() =>        
        if @_Action == "SaveCanvas"
           @canvas.saveObject()
        else          
          @canvas.showLoadModal()
      )()    