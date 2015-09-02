define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  MappingAssignmentAction = require 'modules/datasketch/actions/mapping_assignment'

  class DeleteMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>
      if meta.context.selection?.length == 1
        objectProps = HM.invoke 'DataMapping.ObjectProperties', []
        dataProps = HM.invoke 'DataMapping.DataProperties', []

        items = []
        console.log objectProps
        for op in objectProps
          subitems = []
          for dp in dataProps
            subitems.push
              id: "#{op.getId()}-#{dp.getId()}"
              label: dp.getName()
              action: new MappingAssignmentAction meta.context.selection[0], op, dp
          items.push
            id: op.getId()
            label: op.getName()
            items: subitems


        list.push
          id: 'map'
          label: "Map"
          items: items

      list
