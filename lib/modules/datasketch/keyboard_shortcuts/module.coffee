define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  HM = require 'core/event/hook_manager'

  DeleteAction = require 'modules/datasketch/actions/delete_objects'

  shortcuts =
    "delete": 8

  class KeyboardShortcutModule extends Module

    run: () =>
      document.addEventListener 'keydown', @_onKeyUp

    _onKeyUp: (evt) =>
      if evt.keyCode in (v for k, v of shortcuts)
        evt.preventDefault()
      # switch evt.keyCode
      #   when 8 # delete
      #     Globals.get('Relay').dispatchEvent 'Action.RequestAction',
      #       action: new DeleteAction Globals.get('Canvas'), Globals.get('Canvas').getSelectedObjects()
