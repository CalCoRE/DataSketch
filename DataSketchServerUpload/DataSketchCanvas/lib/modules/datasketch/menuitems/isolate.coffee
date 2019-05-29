define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  IsolateGroupAction = require 'modules/datasketch/actions/isolate_group'
  Group = require 'modules/datasketch/canvas/objects/group/object'

  class IsolateMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>
      if meta.context.selection?.length == 1 and meta.context.selection[0] instanceof Group
        list.push
          id: 'isolate'
          label: "Isolate"
          action: new IsolateGroupAction Globals.get('Canvas'), meta.context.selection[0]
      if meta.context.isolation.length
        list.push
          id: 'exit-isolation'
          label: "Exit Isolation"
          action: new IsolateGroupAction Globals.get('Canvas'), null
      list
