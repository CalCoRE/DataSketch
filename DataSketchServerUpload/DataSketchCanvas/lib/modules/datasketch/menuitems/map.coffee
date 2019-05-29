define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  MappingAssignmentAction = require 'modules/datasketch/actions/mapping_assignment'

  class DeleteMenuItemModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ObjectProperty.MenuItems', @_hookMenuItems

    _hookMenuItems: (list, meta) =>      
      if meta.context.selection?.length == 1
        objectProps = HM.invoke 'DataMapping.ObjectProperties', []
        dataProps = HM.invoke 'DataMapping.DataProperties', []
        items = []
        mappings = meta.context.selection[0].getPropertyMappings()
        mappedProps = (m.objectProperty.getId() for m in mappings)
        for op in objectProps
          subitems = []
          if op.getId() in mappedProps
            dp = null
            for m in mappings
              if m.objectProperty.getId() == op.getId()
                dp = m.dataProperty
          else
            for dp in dataProps
              subitems.push
                id: "#{op.getId()}-#{dp.getId()}"
                label: dp.getName()
                action: new MappingAssignmentAction meta.context.selection[0], op, dp

          disabled = false
          if (op.getId() == "scale" and ("height" in mappedProps or "width" in mappedProps)) or (op.getId() in ["height", "width"] and "scale" in mappedProps)
            disabled = true

          list.push
            id: op.getId()
            label: op.getName()
            items: subitems
            #disabled: disabled

      list
