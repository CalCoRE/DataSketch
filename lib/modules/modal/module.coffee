define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  Modal = require './modal'

  class ModalModule extends Module

    init: () =>
      Globals.get('App.view').addChild Modal.view()