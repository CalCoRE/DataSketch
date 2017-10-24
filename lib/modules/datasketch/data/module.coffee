define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  PapaParse = require 'thirdparty/papaparse'

  DataStore = require './models/datastore'
  DataTableView = require './views/table'
  ModeSelectTool = require 'modules/datasketch/tools/mode/tool'
  HM = require 'core/event/hook_manager'

  require 'link!./style.css'

  class DSData extends Module
    constuctor: () ->

    listPreload: () =>
      list = super()
      list.push "text!#{window.DataSketchConfig.dataSource}"
      list

    handlePreload: (csv) =>
      codapHelper.dsData = this

      codapHelper.dsGlobals = Globals

      codapHelper.dsDataStore = DataStore

      codapHelper.dsPapaParse = PapaParse

      d = PapaParse.parse csv,
        header: true
        dynamicTyping: true

      ds = new DataStore
        rows: d.data
        properties: d.meta.fields

      Globals.set 'DataStore', ds

    init: () =>
      HM.hook 'Toolbar.Tools', @_toolbarTools
      HM.hook 'DataMapping.DataProperties', @_listMappingProperties

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool "data"
      list

    run: () =>
      @_view = new DataTableView Globals.get('DataStore')
      Globals.get('App.view').addChild @_view

      Globals.get('Canvas').addEventListener 'Canvas.ModeChange', @_onModeChange

      codapHelper.dataTableView = @_view

    _onModeChange: (evt) =>
      
      if evt.currentTarget.getMode() == "data"
        @_view.show()
        Globals.get('Canvas').disable()
      else
        @_view.hide()
        Globals.get('Canvas').enable()

    _listMappingProperties: (list, meta) =>
      list = list.concat Globals.get 'DataStore.properties'
      list
    
    reload: ()=>
