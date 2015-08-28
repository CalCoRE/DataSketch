define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  PapaParse = require 'thirdparty/papaparse'

  DataStore = require './models/datastore'
  DataTableView = require './views/table'
  ModeSelectTool = require 'modules/datasketch/tools/mode/tool'
  # DataModeSelectTool = require './tool/tool'
  HM = require 'core/event/hook_manager'

  require 'link!./style.css'

  class DSCanvas extends Module
    constuctor: () ->

    listPreload: () =>
      list = super()
      list.push "text!#{window.DataSketchConfig.dataSource}"
      list

    handlePreload: (csv) =>
      d = PapaParse.parse csv,
        header: true
        dynamicTyping: true

      ds = new DataStore
        rows: d.data
        headers: d.meta.fields

      Globals.set 'DataStore', ds

    init: () =>
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool "data"
      list

    run: () =>
      @_view = new DataTableView Globals.get('DataStore')
      Globals.get('App.view').addChild @_view

      Globals.get('Canvas').addEventListener 'Canvas.ModeChange', @_onModeChange

    _onModeChange: (evt) =>
      if evt.currentTarget.getMode() == "data"
        @_view.show()
        Globals.get('Canvas').disable()
      else
        @_view.hide()
        Globals.get('Canvas').enable()
