define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  GroupAction = require 'modules/datasketch/actions/group_objects'
  UngroupAction = require 'modules/datasketch/actions/ungroup_objects'
  Group = require 'modules/datasketch/canvas/objects/group/object'

  class GroupMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>
      if meta.context.selection?.length > 1
        list.push
          id: 'group-objects'
          label: "Group"
          action: new GroupAction Globals.get('Canvas'), meta.context.selection
      else if meta.context.selection?.length == 1 and meta.context.selection[0] instanceof Group
        list.push
          id: 'ungroup-objects'
          label: "Ungroup"
          action: new UngroupAction Globals.get('Canvas'), meta.context.selection[0]
      list
