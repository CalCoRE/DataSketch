define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  DeleteAction = require 'modules/datasketch/actions/delete_objects'

  class DeleteMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>
      if meta.context.selection?.length
        list.push
          id: 'delete-object'
          label: "Delete"
          action: new DeleteAction Globals.get('Canvas'), Globals.get('Canvas').getSelectedObjects()
      list