define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  DuplicateAction = require 'modules/datasketch/actions/duplicate_objects'

  class DuplicateMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>
      if meta.context.selection?.length
        list.push
          id: 'duplicate-object'
          label: "Duplicate"
          action: new DuplicateAction Globals.get('Canvas'), meta.context.selection
      list
